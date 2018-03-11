import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
    export class ProfilePage {
      user = this.navParams.get('user');
      uid = firebase.auth().currentUser.uid;
      profileKey: string = this.navParams.get('uid');
      isFollow: boolean = false;
      followColor: string;
      followText: string;
      followIcon: string;

      constructor(public navCtrl: NavController, public db: AngularFireDatabase, private navParams: NavParams) {
        this.db.list(`users/${this.profileKey}/followers`).query.orderByValue().equalTo(this.uid).on("value", data => {
          let followerKey = "";
          for (const key in data.val()) {
            followerKey = key;
          }
          if (followerKey == this.uid) {
            this.isFollow = true;
            this.followColor = "dark";
            this.followText = "";
            this.followIcon = "star";
          } else {
            this.isFollow = false;
            this.followColor = "default";
            this.followText = "FOLLOW";
            this.followIcon = "";
          }
        });
      }

      follow() {
        if (this.isFollow) {
          this.db.list(`users/${this.profileKey}/followers/${this.uid}/`).remove();
          this.db.list(`users/${this.uid}/following/${this.profileKey}/`).remove();
          console.log("unfollowed");
        } else if (!this.isFollow) {
          this.db.list(`users/${this.profileKey}/followers/`).set(this.uid, this.uid);
          this.db.list(`users/${this.uid}/following/`).set(this.profileKey, this.profileKey);
          console.log("followed");
        }
      }

  editProfile() {
    this.navCtrl.push("EditProfilePage", { user: this.user, uid: this.uid });
  }

  pricelist() {
    if (this.navCtrl.last().id == "MePage") {
      this.navCtrl.push("PricelistPage", { profileKey: this.uid });
    } else {
      this.navCtrl.push("PricelistPage", { profileKey: this.profileKey });
    }
  }

}
