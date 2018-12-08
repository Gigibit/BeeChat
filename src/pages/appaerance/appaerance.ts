import { Component, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TextLabel } from '../../models/text-label';
import { WebRTCProvider } from '../../providers/webrtc';
import { Theme } from '../core/theme';

/**
 * Generated class for the AppaerancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-appaerance',
  templateUrl: 'appaerance.html',
})
export class AppaerancePage {
  hiddenThemes=true;
  Theme = Theme
  theme: Theme
  themeContainer: HTMLElement;
  contentElement          : HTMLElement

  texts: TextLabel[] = []
  mCamera           : HTMLVideoElement;


  constructor(public navCtrl: NavController, public navParams: NavParams, public html: ElementRef) {
  }

  ionViewDidLoad() {

    this.themeContainer = this.html.nativeElement.querySelector('#themes-container');
    this.mCamera        = this.html.nativeElement.querySelector('#peer-camera');
    this.contentElement = this.html.nativeElement.querySelector('#fc-content');
  }
  ionViewWillEnter(){
    this.mCamera.srcObject = WebRTCProvider.localStream;
  }

  performChanges(theme){
    this.theme = theme
  }

  closeChangeTheme(){
    this.themeContainer.classList.add('puffOut');
  }
  changeTheme(){
    this.themeContainer.classList.add(this.hiddenThemes ? 'puffIn' : 'puffOut');
    this.themeContainer.classList.remove(this.hiddenThemes ? 'puffOut' : 'puffIn');
    setTimeout(()=> this.hiddenThemes = !this.hiddenThemes, 1000);
  }
  addText(){
    this.texts.push({
      id: Math.floor(Math.random()*10),
      text: "Text...",
      style: `top: ${10*this.texts.length}px, left: 20` 
    })
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

  delete(element){
    this.texts = this.texts.filter(item => item.id !== element.id);
  }
}
