import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user;
  uid = firebase.auth().currentUser.uid;;
  profileKey: string;
  role;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, private navParams: NavParams) {
    if (this.navCtrl.last() == undefined) {
      this.profileKey = this.uid;
      this.db.object(`users/${this.uid}`).snapshotChanges()
        .subscribe(data => {
          this.user = data.payload.val();
        });
    } else {
      this.user = this.navParams.get('user');
      this.profileKey = this.navParams.get('uid');
    }
  }

  ionViewDidEnter() {
    console.log(this.user);
  }

  editProfile() {
    this.navCtrl.push("EditProfilePage", { user: this.user, uid: this.uid });
  }

}
