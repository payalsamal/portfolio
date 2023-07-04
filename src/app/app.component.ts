import { Component, ElementRef ,OnInit, OnDestroy } from '@angular/core';
declare var require: any
const FileSaver = require('file-saver');

import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy{
  isPlay = false;
  title = 'portfolio';
  imageSrc = '/assets/image/payall.png';
  twitter = '/assets/image/twitter.png';
  linkedIn = '/assets/image/linkedin.png';
  gitHub = '/assets/image/github2.png';

  time = new Date();
  rxTime = new Date();
  intervalId:any;
  subscription: Subscription = new Subscription;

  downloadPdf() {
    const pdfUrl = './assets/image/graduation_compressed (1).pdf';
    const pdfName = 'graduation_compressed (1)';
    FileSaver.saveAs(pdfUrl, pdfName);
  }
  playMusic(music: any) {
    this.isPlay = !this.isPlay;
    this.isPlay ? music.play() : music.pause();
    console.log(music)
  }
  scrollTo(ref:ElementRef){
ref.nativeElement.scrollTo()
  }
 

  ngOnInit() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.rxTime = time;
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  scrollPage(id: any){
    document.getElementById(id)?.scrollIntoView({
      behavior:'smooth',
      block:'start',
      inline:'nearest'
    })
  }
}
