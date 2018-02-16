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
  user;
  uid = firebase.auth().currentUser.uid;;
  profileKey: string;
  role;
  priceList : "friday";

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, private navParams: NavParams) {
    this.user = this.navParams.get('user');
    this.profileKey = this.navParams.get('uid');
  }

  apps: any = {
    'monday': [
      {
        'time': {
          name: '3 tower',
          price: '218'
        },
        'time2': {
          name: 'Martel',
          price: '169'
        },
        'time3': {
          name: '2 Martel 2 Tower',
          price: '400'
        }
      }
    ],
    'tuesday': [
      {
        'time': {
          name: '3 tower',
          price: '218'
        },
        'time2': {
          name: 'Martel',
          price: '169'
        },
        'time3': {
          name: '2 Martel 2 Tower',
          price: '400'
        }
      }
    ],
    'wednesday': [
      {
        'time': {
          name: '3 tower',
          price: '218'
        },
        'time2': {
          name: 'Martel',
          price: '169'
        },
        'time3': {
          name: '2 Martel 2 Tower',
          price: '400'
        }
      }
    ],
    'thursday': [
      {
        'time': {
          name: '3 tower',
          price: '218'
        },
        'time2': {
          name: 'Martel',
          price: '169'
        },
        'time3': {
          name: '2 Martel 2 Tower',
          price: '400'
        }
      }
    ],
    'friday': [
      {
        'time': {
          name: '3 tower',
          price: '218'
        },
        'time2': {
          name: 'Martel',
          price: '169'
        },
        'time3': {
          name: '2 Martel 2 Tower',
          price: '400'
        }
      }
    ],
    'saturday': [
      {
        'time': {
          name: '3 tower',
          price: '218'
        },
        'time2': {
          name: 'Martel',
          price: '169'
        },
        'time3': {
          name: '2 Martel 2 Tower',
          price: '400'
        }
      }
    ],
    'sunday': [
      {
        'time': {
          name: '3 tower',
          price: '218'
        },
        'time2': {
          name: 'Martel',
          price: '169'
        },
        'time3': {
          name: '2 Martel 2 Tower',
          price: '400'
        }
      }
    ]
  }

  getItems(type: any) {
    return this.apps[type];
  }

  ionViewDidEnter() {
    console.log(this.user);
  }

  userSettings() {
    this.navCtrl.push("UserSettingsPage", { user: this.user, uid: this.uid });
  }

  editProfile() {
    this.navCtrl.push("EditProfilePage", { user: this.user, uid: this.uid });
  }

}
