import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user;
  uid: string;
  currentUser = firebase.auth().currentUser;
  profileKey: string;
  role;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase) {
    let currentUser = firebase.auth().currentUser;
    this.uid = currentUser.uid;
    this.db.object(`users/${this.uid}`).snapshotChanges()
    .subscribe(data => {
      this.profileKey = data.key;
      this.user = data.payload.val();
    });
  }

  editProfile() {
    this.navCtrl.push("EditProfilePage", { user: this.user });
  }

}
