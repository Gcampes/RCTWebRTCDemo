/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
} = React;
var Button = require('react-native-button');

window.navigator.userAgent = "react-native";
var io = require('socket.io-client/socket.io');

var socket = io.connect('http://react-native-webrtc.herokuapp.com');

var WebRTC = require('react-native-webrtc');
var {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView
} = WebRTC;

var configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

var pcPeers = {};
var localStream;

function getLocalStream() {
  navigator.getUserMedia({ "audio": true, "video": true }, function (stream) {
    localStream = stream;
    container.setState({selfViewSrc: stream.objectId});
    container.setState({status: 'ready', info: 'Please enter or create room ID'});
  }, logError);
}

function join(roomID) {
  socket.emit('join', roomID, function(socketIds){
    console.log('join', socketIds);
    for (var i in socketIds) {
      var socketId = socketIds[i];
      createPC(socketId, true);
    }
  });
}

function createPC(socketId, isOffer) {
  var pc = new RTCPeerConnection(configuration);
  pcPeers[socketId] = pc;

  pc.onicecandidate = function (event) {
    console.log('onicecandidate', event);
    if (event.candidate) {
      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
    }
  };

  function createOffer() {
    pc.createOffer(function(desc) {
      console.log('createOffer', desc);
      pc.setLocalDescription(desc, function () {
        console.log('setLocalDescription', pc.localDescription);
        socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
      }, logError);
    }, logError);
  }

  pc.onnegotiationneeded = function () {
    console.log('onnegotiationneeded');
    if (isOffer) {
      createOffer();
    }
  }

  pc.oniceconnectionstatechange = function(event) {
    console.log('oniceconnectionstatechange', event);
  };
  pc.onsignalingstatechange = function(event) {
    console.log('onsignalingstatechange', event);
  };

  pc.onaddstream = function (event) {
    console.log('onaddstream', event);
    container.setState({info: 'One peer join!'});

    var remoteList = container.state.remoteList;
    remoteList[socketId] = event.stream.objectId;
    container.setState({ remoteList: remoteList });
  };
  pc.addStream(localStream);
  return pc;
}

function exchange(data) {
  var fromId = data.from;
  var pc;
  if (fromId in pcPeers) {
    pc = pcPeers[fromId];
  } else {
    pc = createPC(fromId, false);
  }

  if (data.sdp) {
    console.log('exchange sdp', data);
    pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
      if (pc.remoteDescription.type == "offer")
        pc.createAnswer(function(desc) {
          console.log('createAnswer', desc);
          pc.setLocalDescription(desc, function () {
            console.log('setLocalDescription', pc.localDescription);
            socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
          }, logError);
        }, logError);
    }, logError);
  } else {
    console.log('exchange candidate', data);
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
}

function leave(socketId) {
  console.log('leave', socketId);
  var pc = pcPeers[socketId];
  var viewIndex = pc.viewIndex;
  pc.close();
  delete pcPeers[socketId];

  var remoteList = container.state.remoteList;
  delete remoteList[socketId]
  container.setState({ remoteList: remoteList });
  container.setState({info: 'One peer leave!'});
}

socket.on('exchange', function(data){
  exchange(data);
});
socket.on('leave', function(socketId){
  leave(socketId);
});

socket.on('connect', function(data) {
  console.log('connect');
  getLocalStream();
});

function logError(error) {
  console.log("logError", error);
}

function mapHash(hash, func) {
  var array = [];
  for (var key in hash) {
    var obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

var container;

var RCTWebRTCDemo = React.createClass({
  getInitialState: function() {
    return {info: 'Initializing', status: 'init', roomID: "", selfViewSrc: null, remoteList: {}};
  },
  componentDidMount: function() {
    console.log('componentDidMountwqer');
    container = this;
  },
  _press(event) {
    this.refs.roomID.blur();
    this.setState({status: 'connect', info: 'Connecting'});
    join(this.state.roomID);
  },
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.info}
        </Text>
        { this.state.status == 'ready' ?
          (<View>
            <TextInput
              ref='roomID'
              autoCorrect={false}
              style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({roomID: text})}
              value={this.state.roomID}
            />
            <Button
              style={{borderWidth: 1, borderColor: 'blue'}}
              onPress={this._press}>
              Enter room
            </Button>
          </View>) : null
        }
        <RTCView src={this.state.selfViewSrc} style={styles.selfView}/>
        {
          mapHash(this.state.remoteList, function(remote, index) {
            return <RTCView key={index} src={remote} style={styles.remoteView}/>
          })
        }
      </View>
    );
  }
});

var styles = StyleSheet.create({
  selfView: {
    width: 100,
    height: 100,
    backgroundColor: '#EF1414',
  },
  remoteView: {
    width: 100,
    height: 100,
    backgroundColor: '#EF1414',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('RCTWebRTCDemo', () => RCTWebRTCDemo);