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
  playlist: Track [] = [
    {
      name:'Lifetime',
      path: 'assets/song/for you.mp3'
    }
  ];
  player: Howl | null = null;
  isPlaying = false;
  activeTrack: Track | null = null;
  progress=0;
  @ViewChild('range', { static: false })
  range!: IonRange;
  begin=0;
  end=0;
  constructor() { 
  }

  ngOnInit() {
  }
  
  start(track: Track){
    if(this.player){
      this.player.stop();
    }
    this.player = new Howl({
      src: ['assets/song/for you.mp3'],
      onplay: () => {
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      }    
    });
    this.player.play();
    this.end=this.player?.duration();
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
      this.start(this.playlist[0]);
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
      this.begin=seek;
      if(this.progress==0 && seek==0){
        this.start(this.playlist[0]);
      }
      setTimeout(()=>{
        this.updateProgress();
      },1000)
    }
  }
}
