import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Params } from "@angular/router";
import { AlertController, ToastController } from '@ionic/angular';
import { timer } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public alertButtons = [
    {
      text: 'Ver invitación',
      cssClass: 'alertBtn',
    },
  ];
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

  isAlertOpen = false;

  constructor(private meta: Meta, private route: ActivatedRoute, private db: AngularFirestore, private alertController: AlertController, private toastController: ToastController) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
      this.db.collection(this.id).valueChanges().subscribe(ent => {
        this.list = ent;
      });
    }
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date('01/10/2024');
      
      let distance = this.end - this.now;
      var day = Math.floor(distance / this._day);
      if(day<0){
        this.disabledButtons=true;
      }
    })
    this.showAlert();
  }
  
  openMapaLocal(){
    window.open("https://maps.app.goo.gl/K9HaeGag7v4RaWR37");
  }
  openMapaMisa(){
    window.open("https://maps.app.goo.gl/2CpKzeotPr8VxByu7");
  }

  handleChange(ev:any, userId: any) {
    var message="";
    var color="light";
    var status=JSON.stringify(ev.target.value).replace(/^"(.*)"$/, '$1');
    if(status=="Asistiré"){
      message="Asistencia Confirmada";
      color="success";
    }else if(status=="No Asistiré"){
      color="danger";
      message="Asistencia No Confirmada";
    }

    this.db.collection(this.id).doc(userId).ref.update({
      Status: status
    }).then(async (test)=>{
      const toast: HTMLIonToastElement=
      await this.toastController.create({
        message: message,
        duration: 2000,
        position: 'top',
        animated: true,
        color: color
        });
        toast.present().then();
    });
  }

  async showAlert() {  
    const alert = await this.alertController.create({
      header: "Has recibido una invitación a nuestra boda",
      subHeader: "J & M",
      message:  "20-01-2024",
      cssClass: 'default-alert', // <- added this
        buttons: [
          {
            text: 'Ver invitación'
          }
        ]
      });
    
      await alert.present();
  }  
  
  trackItems(index: number, item: any) {
    return item.id;
  }
}
