import Meteor from 'react-native-meteor';


let dataSubscriptions = null;
function subscribeForData() {
  if (dataSubscriptions) {
    return dataSubscriptions;
  }

  const subNames = [
    'users', 'chat', 'cursor', 'deskshare', 'meetings',
    'polls', 'presentations', 'shapes', 'slides',
  ];

  let subs = [];
  subNames.forEach(name => subs.push(subscribeFor(name)));

  dataSubscriptions = subs;
  return subs;
}

function subscribeFor(collectionName) {
  const credentials = {
    meetingId: '183f0bf3a0982a127bdb8161e0c44eb696b3e75c-1470051650040',
    requesterUserId: 'emlsq9q2spti',
    requesterToken: 'wvus4kv3ujdj',
  };
  return new Promise((resolve, reject) => {
    Meteor.subscribe(collectionName, credentials, {
      onReady: (...args) => resolve(...args),
      onStop: (...args) => reject(...args),
    });
  });
}

function subscribeToCollections(cb) {
  console.log('subscribing');
  subscribeFor('users').then(() => {
    Promise.all(subscribeForData()).then(() => {
      if (cb) {
        cb();
      }
    });
  });
}

module.exports = {
  subscribeToCollections
};
