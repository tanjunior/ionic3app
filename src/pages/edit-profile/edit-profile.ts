import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase, { User } from 'firebase';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user;
  uid = firebase.auth().currentUser.uid;
  previousPage = this.navCtrl.last().id;
  countries;
  c;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    if (this.previousPage == "ProfilePage") {
      console.log("i came from profile page");
      this.user = this.navParams.get("user")
    } else if (this.previousPage == "RegisterPage") {
      this.user = {} as User;
      console.log("i came from profile page");
    }
    this.user.country = this.c.capital;
  }

  saveProfile() {
    this.db.list(`users`).update(this.uid, this.user).then(() =>{
      if (this.previousPage == "RegisterPage") {
        this.navCtrl.setRoot("TabsPage");
      } else if (this.previousPage == "ProfilePage") {
        this.navCtrl.pop();
      }
    });
  }

}
