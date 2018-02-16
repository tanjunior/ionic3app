import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the UserSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html',
})
export class UserSettingsPage {
  user = this.navParams.get("user");
  uid = this.navParams.get("uid");

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSettingsPage');
  }

  editProfile() {
    this.navCtrl.push("EditProfilePage", { user: this.user, uid: this.uid });
  }

  async logOut(): Promise<void> {
    await firebase.auth().signOut();
    this.navCtrl.setRoot('LoginPage');
  }

}
