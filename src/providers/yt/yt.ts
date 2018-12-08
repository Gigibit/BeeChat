import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class YtProvider {
  apiKey = 'AIzaSyDF2FaWJmTe0_fOCBylo7SR8SozNrfh4o0';
 
  constructor(public http: HttpClient) {
    this.setupPlayer();
   }
 
youtube: any = {
  ready: false,
  player: null,
  videoId: null,
  videoTitle: null,
  playerHeight: '360',
  playerWidth: '640'
}

bindPlayer(elementId): void {
  this.youtube.playerId = elementId;
};

createPlayer(videoId): void {

  return new window['YT'].Player('player', {
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
    videoId: videoId,
    events: {
      'onReady': window['onPlayerReady'],
      'onStateChange': window['onPlayerStateChange']
    }
  });
}


loadPlayer(): void {
  if (this.youtube.ready && this.youtube.playerId) {
  if (this.youtube.player) {
      this.youtube.player.destroy();
  }
  }
}

setupPlayer () {
  console.log ("Running Setup Player");
  window['onYouTubeIframeAPIReady'] = () => {
      if (window['YT']) {
          console.log('Youtube API is ready');
          this.youtube.ready = true;
          this.bindPlayer('player');
          this.loadPlayer();
      }
 };
  window['onPlayerReady'] = (event)=>{ console.log(event) }

  window['onPlayerStateChange'] = (event)=>{ 
    this.onPlayerStateChange(event);
  }
  if (window['YT'] && window['YT'].Player) {
      console.log('Youtube API is ready');
      this.youtube.ready = true;
      this.bindPlayer('player');
      this.loadPlayer();
  }
}

onVideoEnded      = ()=>console.log('Video finish!')
//onVideoStart      = ()=>console.log('Video started!')
onVideoPaused     = ()=>console.log('Video paused!')
onVideoUnstarted  = ()=>console.log('Video unstarted!')

onPlayerStateChange(event){
  switch(event.data){
    case -1: return this.onVideoUnstarted();
    case window['YT'].PlayerState.PAUSED: return this.onVideoPaused()
    //case window['YT'].PlayerState.PLAYING: return this.onVideoStart
    case window['YT'].PlayerState.ENDED: return this.onVideoEnded();
  }
}

launchPlayer(id):void {
  if(this.youtube.player == null){
    this.youtube.player = this.createPlayer(id);
  }
  else{
    this.youtube.player.loadVideoById(id);
  } 
   this.youtube.videoId = id;
   //this.youtube.videoTitle = title;
   return this.youtube;
}
  getVideosByQuery(query:string){
    return this.http.get('https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&type=video&q=' + query + '&part=snippet,id&maxResults=20')
    .map((res) => {
      res['items'].forEach(element => {
          console.log(element.snippet)
      });
      return res['items'];
    })
  }

  getPlaylistsForChannel(channel) {
    console.log('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20')

    return this.http.get('https://www.googleapis.com/youtube/v3/playlists?key=' + this.apiKey + '&channelId=' + channel + '&part=snippet,id&maxResults=20')
    .map((res) => {
      return res['items'];
    })
  }
 
  getListVideos(listId) {
    return this.http.get('https://www.googleapis.com/youtube/v3/playlistItems?key=' + this.apiKey + '&playlistId=' + listId +'&part=snippet,id&maxResults=20')
    .map((res) => {
      return res['items'];
    })
  }

}

