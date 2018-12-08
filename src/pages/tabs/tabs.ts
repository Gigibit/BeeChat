import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallPage } from '../call/call';
import { AppaerancePage } from '../appaerance/appaerance';
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

    call = CallPage;
    appaerance = AppaerancePage;
    settings = SettingsPage;

constructor(public navCtrl: NavController, public navParams: NavParams) {
}
 

}