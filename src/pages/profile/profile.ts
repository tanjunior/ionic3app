import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import firebase from 'firebase';
import { FirebaseService } from '../../providers/firebase-service/firebase-service';
import {ShareService } from '../../providers/share-service/share-service'

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user;
  currentUser = firebase.auth().currentUser;
  profileKey: string;
  role;
  

  constructor(public navCtrl: NavController, public firebaseService: FirebaseService, shareService: ShareService) {
    this.user = shareService.getUser().subscribe(u = > {
      console.log(['profile.ts]' ,u);
    });
    
  }



  ionViewWillLoad(){ 
    
  }
  editProfile() {
    this.navCtrl.push("EditProfilePage", {user: this.user, uid: this.currentUser.uid});
  }

}
