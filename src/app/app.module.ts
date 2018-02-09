import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService } from './../providers/firebase-service/firebase-service';
import { ToastService } from '../providers/toast-service/toast-service';
import { FIREBASE_CONFIG } from './firebase.credentials';

import { CountryPickerModule } from 'ngx-country-picker';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
  ],
  imports: [
    BrowserModule,
    CountryPickerModule.forRoot(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseService,
    ToastService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
