import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operator/';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ShareService {
  uid: string;
  user;

  constructor(public db: AngularFireDatabase) {
    let currentUser = firebase.auth().currentUser;
    this.uid = currentUser.uid;
    this.userData()
    console.log('[constructor]user: ', this.user);
  }

  userData() {
    this.db.object(`users/${this.uid}`).snapshotChanges()
    .pipe(map(data => {
      this.user = data.payload.val();
      console.log('[userData]user: ', this.user);
      return this.user;
    });
  }

  getUser() {
    if (!this.user) {
      return this.userData();
    } else {
      return of(this.user);
    }
  }

}
