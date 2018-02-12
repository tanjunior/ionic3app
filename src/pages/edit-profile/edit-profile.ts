import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { CountryPickerService, ICountry } from 'ngx-country-picker';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  user = this.navParams.get("user");
  uid = this.navParams.get("uid");
  countries: ICountry[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public cPickService: CountryPickerService) {
    this.cPickService.getCountries().subscribe((countries: ICountry[]) => //get all country
      this.countries = countries); // store it in countries
  }

  saveProfile() {
    this.db.list(`users`).update(this.uid, this.user).then(() =>{
      this.navCtrl.pop();
    });
  }

}
