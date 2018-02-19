import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
//import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-pricelist',
  templateUrl: 'pricelist.html',
})
export class PricelistPage {
  profileKey: string = this.navParams.get('uid');;
  day: string = "thursday";
  pricelist: Array<any> = [];
  //itemRef: firebase.database.Reference = firebase.database().ref(`/pricelists/${this.profileKey}`);

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {

  }

  ionViewWillLoad() {
    this.db.object(`/pricelists/${this.profileKey}/pricelist`).snapshotChanges().subscribe(data => {
      this.pricelist = data.payload.val();
      console.log(this.pricelist);
    });

    /*  not sure why this is not working */
    /*  this.itemRef.on('value', itemSnapshot => {
          this.pricelist = [];
          itemSnapshot.forEach(itemSnap => {
            this.pricelist.push(itemSnap.val());
            return false;
          });
        }); */
  }

  getTimings(day: any) {
    let timings = [];
    for (let timing in this.pricelist[day]) {
      timings.push(timing);
    }
    return timings;
  }

  getItems(time: any) {
    let items = [];
    for (let item in this.pricelist[this.day][time]) {
      items.push(this.pricelist[this.day][time][item]);
    }
    return items;
  }

}
