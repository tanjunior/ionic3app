import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.createProfile = functions.auth.user().onCreate( event => {
    return admin.database().ref(`/users/${event.data.uid}`).set({
        email: event.data.email,
        //username: "user.username from register.ts?"
        //country: "user.country from register.ts?"
        //age: "user.age from register.ts?"
    });
  });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
