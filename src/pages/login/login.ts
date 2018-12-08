

import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../system/utils';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { YtProvider } from '../../providers/yt/yt';
import { Observable } from 'rxjs';


@Component({
  selector: 'page-home',
  templateUrl: 'login.html'
})
export class LoginPage {
  result = {};
  data = '';
  loggedIn = false;
  loading: Loading;
  playlists: Observable<any[]>;
  channelId = 'UCZZPgUIorPao48a1tBYSDgg'; // Devdactic Channel ID

  device_id: string
  player: any
  

  constructor(public navCtrl: NavController, 
              public http: HttpClient, 
              private iab: InAppBrowser, 
              private storage: Storage, 
              private plt: Platform, 
              private alertCtrl: AlertController,
              private ytProvider: YtProvider,
              private loadingCtrl: LoadingController) { //
      

   
  }



  
  openPlaylist(id) {
    //this.navCtrl.push(PlaylistPage, {id: id});
  }
  searchPlaylists() {
    this.playlists = this.ytProvider.getPlaylistsForChannel(this.channelId);
    this.playlists.subscribe(data => {
      console.log('playlists: ', data);
    }, err => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'No Playlists found for that Channel ID: '+err,
        buttons: ['OK']
      });
      alert.present();
    })
  }
 
 
//   openPlaylist(item) {
//     this.navCtrl.push('PlaylistPage', { playlist: item });

    
//   }
 
//   logout() {
//     // Should be a promise but isn't
//     //cordova.plugins.spotifyAuth.forget();
 
//     this.loggedIn = false;
//     this.playlists = [];
//     this.storage.set('logged_in', false);
//   }
 
//   getAccessToken(onToken:(token)=>void){
//     this.storage.get('spotify.access_token').then(token=>{
//       console.log(token)
//       onToken(token)
      
//     })
//   }
//   initPlayer(){
//     let self = this;
//     window.onSpotifyWebPlaybackSDKReady = () => {
//       setTimeout(()=>{
//       this.getAccessToken(token=>{
//         const player = new Spotify.Player({
//           name: 'Web Playback SDK Quick Start Player',
//           getOAuthToken: cb => { cb(token); }
//         });
      
//         // Error handling
//         player.addListener('initialization_error', ({ message }) => { console.error(message); });
//         player.addListener('authentication_error', ({ message }) => { console.error(message); });
//         player.addListener('account_error', ({ message }) => { console.error(message); });
//         player.addListener('playback_error', ({ message }) => { console.error(message); });
      
//         // Playback status updates
//         player.addListener('player_state_changed', state => { console.log(state); });
      
//         // Ready
//         player.addListener('ready', ({ device_id }) => {
//           console.log(device_id)
//           self.storage.set('spotify.device_id', device_id);
//         });
      
//         // Not Ready
//         player.addListener('not_ready', ({ device_id }) => {
//           console.log('Device ID has gone offline', device_id);
//         });
      
//         // Connect to the player!
//         player.connect();
//         self.player = player;
//     });
//   },2000);
//   }
// }
}