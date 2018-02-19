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
    this.user = this.navParams.get('user');
    this.profileKey = this.navParams.get('uid');
  }

  editProfile() {
    this.navCtrl.push("EditProfilePage", { user: this.user, uid: this.uid });
  }
  
  pricelist() {
    this.navCtrl.push("PricelistPage", { user: this.user, uid: this.uid });
  }

}
