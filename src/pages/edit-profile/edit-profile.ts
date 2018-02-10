import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user = this.navParams.get("user");
  uid = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
  }

  saveProfile() {
    this.db.list(`users`).update(this.uid, this.user).then(() =>{
      this.navCtrl.pop();
    });
  }

}
