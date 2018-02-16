import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {
  user;
  uid = firebase.auth().currentUser.uid;;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.db.object(`users/${this.uid}`).snapshotChanges()
      .subscribe(data => {
        this.user = data.payload.val();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }

  profilePage() {
    this.navCtrl.push("ProfilePage", { user: this.user, uid: this.uid });
  }
}
