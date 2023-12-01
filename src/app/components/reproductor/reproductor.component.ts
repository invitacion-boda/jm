import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';
import { Howl } from 'howler';

export interface Track {
  name:string;
  path:string;
}

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.scss'],
})
export class ReproductorComponent  implements OnInit {
  player: Howl = new Howl({
    src: ['assets/song/for you.mp3'],
    onplay: () => {
      this.isPlaying = true;
      this.updateProgress();
    }    
  });
  isPlaying = false;
  progress=0;
  @ViewChild('range', { static: false })
  range!: IonRange;
  constructor() {
    
  }

  ngOnInit() {
    this.start();
  }
  
  start(){
    if(this.player){
      this.player.stop();
    }
    /*this.player = new Howl({
      src: ['assets/song/for you.mp3'],
      onplay: () => {
        this.isPlaying = true;
        this.updateProgress();
      }    
    });*/
    this.player.play();
  }

  togglePlayer(pause: boolean){
    this.isPlaying=!pause;
    if(this.player){
      if(pause){
        this.player.pause();
      }else{
        this.player.play();
      }
    }else{
      this.start();
    }
  }

  seek(){
    let newValue= +this.range.value;
    let duration = this.player?.duration();
    if(duration){
      this.player?.seek(duration * (newValue /100));
    }
  }

  updateProgress(){
    if(this.player){
      let seek = this.player.seek();
      this.progress=(seek / this.player.duration()) * 100 || 0;
      if(this.progress==0 && seek==0){
        this.start();
      }
      setTimeout(()=>{
        this.updateProgress();
      },1000)
    }
  }
}
