import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallPage } from '../call/call';
import { Sim }      from '@ionic-native/sim'
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { FirebaseApp } from '@angular/fire';
import { Theme } from '../core/theme';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  phone: string;
  Theme = Theme
  phase = 'login'
  step=1
  
  constructor(public navCtrl: NavController,
              public firebase :FirebaseApp,              
              public sim: Sim,
              androidPermissions: AndroidPermissions) {

      androidPermissions.requestPermissions(
        [
          androidPermissions.PERMISSION.CAMERA,
          androidPermissions.PERMISSION.CALL_PHONE,
          androidPermissions.PERMISSION.GET_ACCOUNTS,
          androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
          androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
        ]
      );
  }

  loginWithInfo(info){
    this.navCtrl.push(CallPage, { phone: info['phoneNumber'] });
  }
  login(theme:Theme) {
    this.firebase.auth().signInAnonymously().then(()=>{
      this.navCtrl.push(CallPage, { phone: this.phone, theme: theme });
    })
  }
}
