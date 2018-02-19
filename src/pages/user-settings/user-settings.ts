import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html',
})
export class UserSettingsPage {
  user = this.navParams.get("user");
  uid = this.navParams.get("uid");

  constructor(public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSettingsPage');
  }

  editProfile() {
    this.navCtrl.push("EditProfilePage", { user: this.user, uid: this.uid });
  }

  async logOut(): Promise<void> {
    await firebase.auth().signOut();
    this.appCtrl.getRootNav().setRoot("LoginPage");
  }

}
