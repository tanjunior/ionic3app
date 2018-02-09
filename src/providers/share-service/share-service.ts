import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operator';

@Injectable()
export class ShareService {
  uid: string;
  user;

  constructor(public db: AngularFireDatabase) {
    let currentUser = firebase.auth().currentUser;
    this.uid = currentUser.uid;
    
    

    console.log('[constructor]user: ', this.user);
  }

  userData() {
    return this.db.object(`users/${this.uid}`).snapshotChanges()
    .pipe(map(data => {
      let userdata = data.payload.val();
      console.log('[userData]user: ', userdata);
      return this.user;
    }));
  }

  getUser() {
    return this.user;
  }

}
