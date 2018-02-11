import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { User } from '../../models/user/user.model';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  user = {} as User;


  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public loadCtrl: LoadingController) {
  }

  async login(user: User) {
    this.loading = this.loadCtrl.create();
    this.loading.present();
    try {
      const RESULT = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (RESULT) {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot('TabsPage');
        });
      }
    }
    catch (e) {
      this.loading.dismiss().then(() => {
        console.error(e);
      });
    }
  }
}
