import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CallPage } from '../pages/call/call';
import { AbsoluteDrag } from '../components/absolute-drag';
import { WebRTCProvider } from '../providers/webrtc';
import { Sim } from '@ionic-native/sim';
import { firebaseConfig } from '../pages/core/config';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth }   from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Media } from '@ionic-native/media';
import { IonicStorageModule } from '@ionic/storage';
import { AndroidPermissions } from '@ionic-native/android-permissions'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule } from '@angular/http';
import { YtProvider } from '../providers/yt/yt';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeSearchModal } from '../pages/youtube-search/youtube-search';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { AppaerancePage } from '../pages/appaerance/appaerance';
//TODO: Remove android permissions
const pages = [
  MyApp,
  HomePage,
  CallPage,
  SettingsPage,
  TabsPage,
  AppaerancePage,
  YoutubeSearchModal
];


export function getPages(){
  return pages;
}

@NgModule({
  declarations:getPages(),
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,    
    HttpModule    
  ],
  bootstrap: [IonicApp],
  entryComponents: getPages(),
  providers: [
    StatusBar,
    SplashScreen,
    Sim,
    WebRTCProvider,
    AndroidPermissions,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AngularFireAuth,
    AngularFireDatabase,
    InAppBrowser,
    Media,
    YtProvider
  ]
})
export class AppModule { }
