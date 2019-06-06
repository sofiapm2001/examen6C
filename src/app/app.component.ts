import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase'; 

export const config =  {
  apiKey: "AIzaSyAdOkwLkr-zH-5NDnEX0s3J_ItkxK7ptso",
    authDomain: "examen-364f8.firebaseapp.com",
    databaseURL: "https://examen-364f8.firebaseio.com",
    projectId: "examen-364f8",
    storageBucket: "examen-364f8.appspot.com",
    messagingSenderId: "571868413529",
    appId: "1:571868413529:web:f8d5f2bab9a3c65f"
};



import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}
