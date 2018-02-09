import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user/user.model';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;


  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {

  }

  async register(user: User) {
    try {
      const RESULT = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (RESULT) {
        this.navCtrl.setRoot('EditProfilePage',{user: this.user});
      }
    } catch (e) {
      console.error(e);
    }
  }
}
