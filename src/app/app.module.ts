import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FirebaseService } from './../providers/firebase-service/firebase-service';
import { UploadService } from '../providers/upload-service/upload-service';
import { ToastService } from '../providers/toast-service/toast-service';
import { FIREBASE_CONFIG } from './firebase.credentials';

import { ElasticModule } from 'ng-elastic';
import { CountryPickerModule } from 'ngx-country-picker';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    ElasticModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicModule.forRoot(MyApp),
    CountryPickerModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ElasticModule,
    FirebaseService,
    UploadService,
    ToastService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
