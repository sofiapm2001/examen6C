import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { Camera, CameraOptions } 
      from '@ionic-native/camera'

import * as firebase from 'firebase';
import 'firebase/firestore';
import { AgregarPage } from '../agregar/agregar';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  posicion:string='';
  tipo:string='';
  copa:string='';
  tronco:string='';
  foto:string ='';

  user:firebase.User;


  db: firebase.firestore.Firestore;
  items=[];

  loginPage= LoginPage;

  agregarPage=AgregarPage;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public camera: Camera) {
    this.user=firebase.auth().currentUser;
    this.db = firebase.firestore();
    //this.getDocuments('discos'); 

  }
  ionViewDidEnter(){
    this.items =[];
    this.getDocuments('trees');
  }

  getPicture (){
    const options: CameraOptions= {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(foto =>{
      this.navCtrl.push(this.agregarPage, {foto: 'data:image/jpeg;base64,'+ foto}) 

    }, error =>{
      console.log(JSON.stringify(error));
    })
  }


  getDocuments(collection:string){
    this.db.collection(collection).where('user', '==', this.user.uid).get()
    .then((res:any) => {
      res.forEach(element =>{
        let trees ={
          id: element.id,
          latitud: element.data().latitud,
          longitud: element.data().longitud,
          tipo: element.data().tipo,
          copa: element.data().copa,
          tronco: element.data().tronco,
          foto: element.data().url
        };
        this.items.push(trees);
      });
    })
    .catch(error =>{
      console.log('Error al conectar firebase .-.')
    })
  }

  agregar (){
    this.navCtrl.push(AgregarPage)
  }
  logout(){
    firebase.auth().signOut()
    .then(data=>{
      const toast= this.toastCtrl.create({
        message: "Se cerro sesion correctamente",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.setRoot(this.loginPage);

    })
    .catch(error=>{
      const toast= this.toastCtrl.create({
        message: "Intente cerrar sesion despues",
        duration: 3000,
        position: 'top'
      });
      toast.present();

    })
  }

}
