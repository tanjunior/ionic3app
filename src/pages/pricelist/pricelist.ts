import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-pricelist',
  templateUrl: 'pricelist.html',
})
export class PricelistPage {
  profileKey: string = this.navParams.get('uid');;
  day: string = "thursday";
  pricelist2: any;
  pricelist: any = {
    "monday": {
      "All Night": {
        "0": {
          "name": "1 Martell",
          "price": "219"
        },
        "1": {
          "name": "3 Martell",
          "price": "539"
        },
        "2": {
          "name": "5 Martell (Free 2 tower)",
          "price": "999"
        }
      }
    },
    "tuesday": {
      "All Night": {
        "0": {
          "name": "1 Martell",
          "price": "219"
        },
        "1": {
          "name": "3 Martell",
          "price": "539"
        },
        "2": {
          "name": "5 Martell (Free 2 tower)",
          "price": "999"
        }
      }
    },
    "wednesday": {
      "All Night": {
        "0": {
          "name": "1 Martell",
          "price": "219"
        },
        "1": {
          "name": "3 Martell",
          "price": "539"
        },
        "2": {
          "name": "5 Martell (Free 2 tower)",
          "price": "999"
        }
      }
    },
    "thursday": {
      "9PM - 9:30PM": {
        "0": {
          "name": "1 tower",
          "price": "39"
        },
        "1": {
          "name": "2 tower",
          "price": "69"
        }
      },
      "9:30PM - 10:30PM": {
        "0": {
          "name": "1 tower",
          "price": "59"
        },
        "1": {
          "name": "2 tower",
          "price": "99"
        }
      },
      "After 10:30PM": {
        "0": {
          "name": "1 tower",
          "price": "99"
        },
        "1": {
          "name": "2 tower",
          "price": "149"
        },
        "2": {
          "name": "3 tower",
          "price": "199"
        }
      },
      "All Night": {
        "0": {
          "name": "1 Martell",
          "price": "219"
        },
        "1": {
          "name": "3 Martell",
          "price": "539"
        },
        "2": {
          "name": "5 Martell (Free 2 tower)",
          "price": "999"
        }
      }
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
    this.db.object(`/pricelists/${this.profileKey}/pricelist`).snapshotChanges().subscribe(data => {
      this.pricelist2 = data.payload.val();
      console.log(this.pricelist2);
    });

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
