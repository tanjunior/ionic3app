import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  email: string;
  handleError;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private alertCtrl: AlertController) {
  }

  resetPassword() {
    this.afAuth.auth.sendPasswordResetEmail(this.email).then((user) => {
      let alert = this.alertCtrl.create({
        message: ("We just sent you a reset link to " + this.email),
        buttons: [
          {
            text: "Ok",
            role: 'cancel',
            handler: () => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      alert.present();
    }).catch(err => {
      let errorAlert = this.alertCtrl.create({
        message: err,
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      errorAlert.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }

}
