import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user/user.model';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;


  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  async login(user: User) {
    try {
      const RESULT = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (RESULT) {
        this.navCtrl.setRoot('TabsPage');
      }
    }
    catch (e) {
      console.error(e);
    }
  }
}
