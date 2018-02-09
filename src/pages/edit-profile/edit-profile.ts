import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user/user.model';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user = this.navParams.get("user");
  uid = this.navParams.get("uid");

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseService: FirebaseService) { }

  saveProfile(user: User) {
    this.firebaseService.editUser(user).then(() => {
      this.navCtrl.pop();
    });
  }

}
