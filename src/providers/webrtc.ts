import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';


/**
 *
 * ANDROID PERMISSIONS:
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.VIBRATE" />

 */



@Injectable()
export class WebRTCProvider {

  peer: PeerJs.Peer;
  mediaConnection: PeerJs.MediaConnection;
  private _dataConnection: PeerJs.DataConnection;
    get dataConnection(){
      return this._dataConnection;
    }
    set dataConnection(connection:PeerJs.DataConnection) {
      this._dataConnection = connection;
      if (this.onMessage){
        this._dataConnection.on('data',this.onMessage);
      }
    }


  myStream: MediaStream;
  myEl: HTMLMediaElement;
  onMessage: (any)=>void;
  onConnection: (stream)=>void;


  options: PeerJs.PeerJSOption;

  constructor() {
    navigator.getUserMedia = navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
      || navigator.msGetUserMedia;
    this.options = {
      host: "192.168.1.6",
      port: 9000,
      path: '/peerjs',
      debug: 3,
      config: {
          'iceServers': [
              { urls: 'stun:stun1.l.google.com:19302' },
              {
                  urls: 'turn:numb.viagenie.ca',
                  credential: 'muazkh',
                  username: 'webrtc@live.com'
              }
          ]

      }
  }
}




getMedia(myEl: HTMLMediaElement) {
  this.myEl = myEl;
  navigator.getUserMedia({ audio: true, video: true }, (stream) => {
    this.myStream = stream;
    this.myEl.srcObject = this.myStream;
  }, (_) => {
    console.error('[getMedia] cannot get user media');
  });
  }



  init(userId: string, myEl: HTMLMediaElement,  onMessage:(string)=>void = null, onConnection:(stream)=>void=null) {
    this.onMessage = onMessage;
    this.onConnection = onConnection;
    this.getMedia(myEl);
    this.createPeer(userId);
  }

  createPeer(userId: string) {
    this.peer = new Peer(userId, this.options);
    this.peer.on('open', () => {
      this.wait();
    });
  }
  send(data: any){
    if(this.dataConnection) this.dataConnection.send(data);
    else console.log('No connection to send: ' + data);
  }


  wait() {

    this.peer.on('call', (call) => {
      call.answer(this.myStream);
      call.on('stream', (stream) => {
        this.peer.on('connection', (connection)=>{
          this.dataConnection = connection;
        });
        this.onConnection(stream)
      });
    });
  }
  disconnect(){
    if( this.dataConnection  )  this.dataConnection .close();
    if( this.mediaConnection )  this.mediaConnection.close();
    
  }

  connect(peerId){
    this.mediaConnection = this.peer.call(peerId, this.myStream);
      this.mediaConnection.on('stream', (stream) => {
        alert('kjb')
        this.onConnection(stream);
        this.dataConnection = this.peer.connect(peerId,{
          serialization: 'json'
        });
      });
  }
}
