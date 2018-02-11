import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';
import { User } from '../../models/user/user.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loading: Loading;
  user = {} as User;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private db: AngularFireDatabase, public loadCtrl: LoadingController) {}

  async register(user: User) {
    this.loading = this.loadCtrl.create();
    this.loading.present();
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(newUser => {
        this.db.list(`users`).set(newUser.uid, {
          email: newUser.email,
          username: this.user.username,
          country: this.user.country,
          age: this.user.age,
        }).then(() => {
          this.loading.dismiss().then(() => {
          this.navCtrl.setRoot('TabsPage');
          });
        });
      }, (error) => {
        this.loading.dismiss().then(() => {
          console.error(error);
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
}
