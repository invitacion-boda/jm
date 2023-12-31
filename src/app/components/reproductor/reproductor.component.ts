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
    },
    autoplay: true,
    format: 'mp3',
    mute: false
  });
  isPlaying = false;
  progress=0;
  @ViewChild('range', { static: false })
  range!: IonRange;
  reproducirAgain=false;
  constructor() {
    
  }

  ngOnInit() {
    this.player.play();
  }
  
  start(){
    if(this.player){
      this.player.stop();
    }
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
    console.log("seek")
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
      if(this.progress>90){
        this.reproducirAgain=true;
      }
      if(this.progress==0 && seek==0 && this.reproducirAgain==true){
        this.start();
      }
      setTimeout(()=>{
        this.updateProgress();
      },1000)
    }
  }
}
