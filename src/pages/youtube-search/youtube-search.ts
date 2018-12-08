import { YtProvider } from '../../providers/yt/yt';
import { Observable } from 'rxjs/Observable';
import { Component, ElementRef } from '@angular/core';
import { ViewController } from 'ionic-angular';
 
@Component({
  selector: 'youtube-search',
  templateUrl: 'youtube-search.html',
})
export class YoutubeSearchModal {
  videos: Observable<any[]>;
  player : any  
  video:any
  constructor(private ytProvider: YtProvider,
              public viewCtrl: ViewController) {
  }
  

  
  dismiss(didSelect = false){
    this.viewCtrl.dismiss({
      didSelect: didSelect,
      video:this.video
    });
  }

  performSearch( query: string ){
    this.videos = this.ytProvider.getVideosByQuery(query);
  }


  openVideo(video) {
      this.video = video
      if(this.player == null)
      this.player = new window['YT'].Player('player', {
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
        videoId: this.video.id.videoId,
        events: {
          'onReady': window['onPlayerReady'],
          'onStateChange': window['onPlayerStateChange']
        }
      });
      else this.player.loadVideoById(this.video.id.videoId);
    
      //this.youtube.openVideo(video.snippet.resourceId.videoId);
  }
}

// openVideo(video) {
//   this.ytProvider.launchPlayer(video);

//   //this.youtube.openVideo(video.snippet.resourceId.videoId);
// }