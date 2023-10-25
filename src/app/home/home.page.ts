import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from "@angular/router";
import { Integrantes } from '../Modelos/Integrantes';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  id: any;
  public list: any = [];
  public elem: any;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private toastController: ToastController) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if(this.id){
      this.db.collection(this.id).valueChanges().subscribe(ent => {
        this.list = ent;
        console.log(this.list)
        /*for (var item of this.elem) {
          const t = {
            nombre: item.Nombre,
            asistira: item.Asistira,
            id: item.Id
          };
          this.list.push(t);
        }*/
      });
    }
    
    
  }
  
  openMapaLocal(){
    window.open("https://maps.app.goo.gl/K9HaeGag7v4RaWR37");
  }
  openMapaMisa(){
    window.open("https://maps.app.goo.gl/2CpKzeotPr8VxByu7");
  }

  confirmarAsistencia(userId: any){
    console.log(userId)
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
    //this.list = [];
  }
  desconfirmarAsistencia(userId: any){
    //this.list = [];
    this.db.collection(this.id).doc(userId).ref.update({
      Asistira: false
    }).then(async (test)=>{
      //this.list = [];
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
