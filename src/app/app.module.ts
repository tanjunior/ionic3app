import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService } from './../providers/firebase-service/firebase-service';
import { ToastService } from '../providers/toast-service/toast-service';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { ShareService } from '../providers/share-service/share-service';
import { TestProvider } from '../providers/test/test';
//import { firebase } from '@firebase/app';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule
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
    ShareService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TestProvider,
  ]
})
export class AppModule {}
