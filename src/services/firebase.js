import { firebase, FieldValue } from '../lib/firebase';

export async function doesGmailExist(gmail) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('gmail', '==', gmail)
    .get();

  return result.docs.length > 0;
}

export async function getUserWatchlist(userId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  return result.docs.map((list) => ({
    ...list.data(),
    docId: list.id,
  }));
}

export async function updateProfileWatchlist(userId, watchId, watchType) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const getDocId = result.docs.map((list) => ({
    docId: list.id,
  }));

  return firebase
    .firestore()
    .collection('users')
    .doc(getDocId[0].docId)
    .update({
      watchlist: FieldValue.arrayUnion({ id: watchId, type: watchType }),
    });
}

export async function deleteItemFromWatchlist(userId, watchId, watchType) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const getDocId = result.docs.map((list) => ({
    docId: list.id,
  }));

  return firebase
    .firestore()
    .collection('users')
    .doc(getDocId[0]?.docId)
    .update({
      watchlist: FieldValue.arrayRemove({ id: watchId, type: watchType }),
    });
}

export async function checkIfInWatchlist(userId, watchId, watchType) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .where('watchlist', 'array-contains', { id: watchId, type: watchType })
    .get();

  return result.docs.length > 0;
}
