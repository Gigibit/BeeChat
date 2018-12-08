import { Component, ElementRef }    from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { WebRTCProvider }           from '../../providers/webrtc';
import { MessageType } from '../core/type';
import { State } from '../core/state';
import { ToogleState } from '../core/toogle';
import { AngularFireDatabase } from '@angular/fire/database';
import { Connection, ConnectionFilters } from '../../models/Connection';
import { Utils } from '../../system/utils';
import { VertexShader } from '../../system/vertexshader';
import { Theme } from '../core/theme';
import { YoutubeSearchModal } from '../youtube-search/youtube-search';
import { YtProvider } from '../../providers/yt/yt';

@Component({
    selector: 'call-home',
    templateUrl: 'call.html'
})
export class CallPage {

    
    Theme = Theme

    ytPlayer                : any
    phone: string;
    resizeBtn               : HTMLElement;
    mCamera                 : HTMLMediaElement;
    //mCanvas                 : HTMLElement;
    peerCamera              : HTMLVideoElement;
    //peerCanvas           : HTMLElement;
    VertexShader            = VertexShader
    bufferStream            : MediaSource | MediaStream | Blob;
    fullScreen              : ToogleState
    mCameraToogle           : ToogleState
    connections             : Connection[];
    connection              : Connection
    peerStream              : MediaStream
    theme                   : string       
    mMessage                : string
    contentElement          : HTMLElement
    public devWidth     = window.innerWidth;
    showPeerCamera      = false;
    mCameraVisible      = false;
    writeMessage        = false;
    readMessage         = false;
    connected           = false;
    cameraArrow         = "ios-videocam-outline"
    


    _buffer: any
    set buffer(msg:any){
        switch(msg['type']){
            case MessageType.TEXT:
                if(msg['content'] !== '')
                this.handleText(decodeURIComponent(escape(window.atob(msg['content']))))
                break;
            case MessageType.CAMERA_STATUS:
                if (msg['state'] == State.CAMERA_HIDDEN)
                {
                    this.bufferStream = this.peerCamera.srcObject;
                    this.peerCamera.srcObject= null;
                }
                else
                {
                    this.peerCamera.srcObject = this.bufferStream;
                    this.bufferStream = null;
                }
                break;
            case MessageType.CHANGE_THEME:
                this.theme= msg['theme'];

                //this.update(msg['vertex_shader'], this.peerGlslCanvas);
                break;
            case MessageType.YOUTUBE_SUGGESTION:
                this.playYoutubeVideoSuggestion(msg['video'])
        }
    }

    constructor(
        public db : AngularFireDatabase,
        public navCtrl: NavController,
        public navParams: NavParams,
        private ytProvider: YtProvider,
        public modalCtrl: ModalController,
        public webRTC: WebRTCProvider,
        public elRef: ElementRef )
    {

        
        this.phone  = this.navParams.get('phone');
        this.theme  = this.navParams.get('theme');
        this.db.list<Connection>('connections')
                .valueChanges()
                .subscribe(connections=>{
                    this.connections = connections
                    console.log(connections)
                    if (!this.connected && this.connections && this.connections.length > 1 ){
                        this.connection = Utils.getFirstItemFiltered(this.connections, ConnectionFilters.isNotConnected);
                        if(!this.connection || this.connection['id'] == this.phone) return;
                        this.connected = true;
                        this.webRTC.connect(this.connection['id']);
                    }
                });
        // .snapshotChanges()
        // .map(
        // connections => {
        //         return connections.map (c=>({
        //         key: c.key,
        //         timestamp: c.payload.val()['timestamp'],
        //         id : c.payload.val()['id']

        //     }))
        // });
    }

    playYoutubeVideoSuggestion(video){
        this.ytProvider.onVideoEnd(()=>{
            this.ytPlayer.destroy();
        })
        if(this.ytPlayer == null)
        this.ytPlayer = new window['YT'].Player('player', {
            height: '360',
            playerVars: {
                controls: 0,
                autoplay: 1,
                rel: 0,
                disablekb: 1,
                enablejsapi:1,
                origin: 'http://localhost:8100'
            },
            width: '640',
            videoId: video.id.videoId,
            events: {
            'onReady': window['onPlayerReady'],
            'onStateChange': window['onPlayerStateChange']
            }
        });
        else this.ytPlayer.loadVideoById(this.ytPlayer.id.videoId);
        
            //this.youtube.openVideo(video.snippet.resourceId.videoId);
        
    }
    swipe(event){
        this.contentElement.innerText = '';
        this.webRTC.disconnect();
        this.onLeaveAnimation();
        let mRef = btoa(unescape(encodeURIComponent(this.phone)));
        this.db.database.ref('/connections/'+mRef).update({
            connected: false
        });
    }

    onLeaveAnimation(){
        switch(this.theme){
            case Theme.CLUB:
                this.peerCamera.classList.add('swiping');
                this.peerCamera.style.left = '-1500px';
                
                setTimeout(()=>{
                    this.peerCamera.style.right = '-3000px';
                    this.peerCamera.style.left = '-3000px';
        
                }, 600);
                this.nextConnection();
                setTimeout(()=>{
                    this.peerCamera.classList.remove('swiping');
                    this.peerCamera.style.right = '0';
                    this.peerCamera.style.left = '0';
                },1200);
                break;
            case Theme.DRUGS:
                this.peerCamera.classList.add('smokey');
                setTimeout(()=>{
                    this.peerCamera.classList.add('smokey-revert');
                },1000);
                this.nextConnection();
                setTimeout(()=>{
                    this.peerCamera.classList.remove('smokey-revert');
                    this.peerCamera.classList.remove('smokey');
                },2000);
        }
    }


    nextConnection(){
        // console.log(self.connections)
        // let nextConnection = [Math.random()%self.connections.count.length]
        // console.log(nextConnection.payload.val());
        this.connection = Utils.getRandomItemFiltered(this.connections,ConnectionFilters.isNotConnected);
        if(this.connection)
        this.webRTC.connect(this.connection.id);
        
    }
    onSuggestVideo(){
        let youtubeSuggestion = this.modalCtrl.create(YoutubeSearchModal);
        youtubeSuggestion.onDidDismiss(data =>{
            console.log(data)
            if(!data.didSelect) return
            let message = {
                type: MessageType.YOUTUBE_SUGGESTION,
                video : data.video.id.videoId
            }
            this.webRTC.send(message)
        })
        youtubeSuggestion.present();
    }

    ionViewWillEnter() {
        this.mCamera              = this.elRef.nativeElement.querySelector('#m-camera');
        this.peerCamera           = this.elRef.nativeElement.querySelector('#peer-camera');
        this.contentElement       = this.elRef.nativeElement.querySelector('#fc-content');
        this.resizeBtn              = this.elRef.nativeElement.querySelector('#resize-btn');
        this.webRTC.init(this.phone, this.mCamera, msg => {
            this.buffer = msg;
        },(stream)=> {

            let mRef = btoa(unescape(encodeURIComponent(this.phone)));
            this.db.database.ref('/connections/'+mRef).update({
                connected: true
            })
            this.connected=true;
            this.showPeerCamera=true;
            this.writeMessage = true;
            this.readMessage = true;
            this.peerCamera.srcObject = stream;

        });
        this.fullScreen = new ToogleState([
        ()=>{
            this.peerCamera.requestFullscreen()
        },
        ()=>{

        }])
        this.mCameraToogle = new ToogleState([
        ()=>{
            this.mCamera.style.width = '250px';
            this.mCamera.style.height = '250px';
        },
        ()=>{
            this.mCamera.style.width = '50px';
            this.mCamera.style.height = '50px';
        }])
        this.playYoutubeVideoSuggestion({ id:{videoId:'EKyirtVHsK0'}})

    }



    send(mMessage){
        if(mMessage.indexOf('\n') !== -1){
            this.mMessage = '';
        }
        else{
            let message = {
                type: MessageType.TEXT,
                content: btoa(unescape(encodeURIComponent(mMessage)))
            }
            this.webRTC.send(message);
        }

    }

    toogleFullscreen(){
        this.fullScreen.toogle()
    }
    toogleMCamera(){
        this.mCameraToogle.toogle()
    }
    showCamera(){
        this.mCameraVisible = !this.mCameraVisible
        this.cameraArrow = this.mCameraVisible ?  "ios-videocam-outline" : "ios-videocam"
        this.webRTC.send({
            type: MessageType.CAMERA_STATUS,
            content:'',
            state: this.mCameraVisible ? State.CAMERA_HIDDEN : State.CAMERA_VISIBILE
        })
    }

    change(theme){
        this.theme = theme;
    }

    handleText(text){
        switch(this.theme){
            case Theme.DRUGS:
                this.contentElement.innerText = '';
                //var innerHtml = '';
                //for (var char of text)
                  //  innerHtml += `<span>${char}</span>`; 
                this.contentElement.insertAdjacentHTML('beforeend', `<span>${text}</span>`);
                break;
            default:
                this.contentElement.innerText = text;
        }
    }
}


