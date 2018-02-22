import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the EditPricelistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-pricelist',
  templateUrl: 'edit-pricelist.html',
})
export class EditPricelistPage {
  day: string = this.navParams.get('day');
  profileKey: string = this.navParams.get('key')
  pricelist: Array<any> = [];
  timings: Array<any> = [];
  items: Array<any> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.db.object(`/pricelists/${this.profileKey}`).snapshotChanges().subscribe(data => {
      this.pricelist = data.payload.val();
      this.getTiming();
    });
  }

  getTiming() {
    this.timings = [];
    for (let timing in this.pricelist[this.day]) {
      this.timings.push(timing);
    }
  }

  getItems(time: string) {
    this.items = [];
    for (let item in this.pricelist[this.day][time]) {
      this.items.push([item, this.pricelist[this.day][time][item]]);
    }
    return this.items;
  }

  addItem(time: string, itemName: string, itemPrice) {
    if (itemName == undefined || itemPrice == undefined) {
      // TODO: toast msg
    } else {
      this.db.list(`/pricelists/${this.profileKey}/${this.day}/${time}`).push({ name: itemName, price: itemPrice });
    }
  }

  addTiming(time: string) {
    if (time == undefined) {
      // TODO: toast msg
    } else {
      this.db.list(`/pricelists/${this.profileKey}/${this.day}/${time}`).push({ name: "1 tower", price: "99" });
    }
  }

  deleteItem(time: string, item) {
    this.db.list(`/pricelists/${this.profileKey}/${this.day}/${time}`).remove(item);
  }

}
