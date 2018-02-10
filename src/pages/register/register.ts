import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;


  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private db: AngularFireDatabase) {

  }

  async register(user: User) {
    try {
      await this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(newUser => {
        firebase.database().ref(`/users/${newUser.uid}`).set({
          email: user.email,
          username: user.username,
          country: user.country,
          age: user.age
        });
        this.navCtrl.setRoot('TabsPage');
      });
    } catch (e) {
      console.error(e);
    }
  }
}
