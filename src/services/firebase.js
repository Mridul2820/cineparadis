import { firebase } from '../lib/firebase'

export async function doesGmailExist(gmail) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('gmail', '==', gmail)
        .get();
  
    return result.docs.length > 0;
}