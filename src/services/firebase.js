import { firebase, FieldValue } from '../lib/firebase'

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
      ...list.data()
    }));
}

export async function updateProfileWatchlist( userID, isAddToList, watchId, watchType ) {
    return firebase
        .firestore()
        .collection('users')
        .doc(userID)
        .update({
            watchlist: isAddToList
            ? FieldValue.arrayRemove({ watchId: watchId, watchType: watchType })
            : FieldValue.arrayUnion({ watchId: watchId, watchType: watchType })
        });
}