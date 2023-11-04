import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Params } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { timer } from 'rxjs';
import  { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id: any;
  public list: any = [];
  public elem: any;
  source = timer(0, 1000);
  clock: any;
  disabledButtons = false;
  end: any;
  now: any;
  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private toastController: ToastController) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
      this.db.collection(this.id).valueChanges().subscribe(ent => {
        this.list = ent;
      });
    }
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date('12/20/2023');
      
      let distance = this.end - this.now;
      var day = Math.floor(distance / this._day);
      if(day<0){
        this.disabledButtons=true;
      }
    });
    
  }
  
  openMapaLocal(){
    window.open("https://maps.app.goo.gl/K9HaeGag7v4RaWR37");
  }
  openMapaMisa(){
    window.open("https://maps.app.goo.gl/2CpKzeotPr8VxByu7");
  }

  confirmarAsistencia(userId: any){
    this.db.collection(this.id).doc(userId).ref.update({
      Asistira: true
    }).then(async (test)=>{
      const toast: HTMLIonToastElement=
      await this.toastController.create({
        message: 'Asistencia Confirmada',
        duration: 2000,
        position: 'bottom',
        animated: true,
        color: 'success'
        });
        toast.present().then();
    });
  }
  desconfirmarAsistencia(userId: any){
    this.db.collection(this.id).doc(userId).ref.update({
      Asistira: false
    }).then(async (test)=>{
      const toast: HTMLIonToastElement=
      await this.toastController.create({
        message: 'Asistencia Desconfirmada',
        duration: 2000,
        position: 'bottom',
        animated: true,
        color: 'success'
        });
        toast.present().then();
    });
  }

  
}
