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
  user = this.navParams.get('user');
  uid = firebase.auth().currentUser.uid;;
  profileKey: string = this.navParams.get('uid');

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, private navParams: NavParams) {
  }

  editProfile() {
    this.navCtrl.push("EditProfilePage", { user: this.user, uid: this.uid });
  }

  pricelist() {
    if (this.navCtrl.last().id == "MePage") {
      this.navCtrl.push("PricelistPage", { profileKey: this.uid });
    } else {
      this.navCtrl.push("PricelistPage", { profileKey: this.profileKey });
    }
  }

}
