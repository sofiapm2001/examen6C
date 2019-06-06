import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation'; 

/**
 * Generated class for the AgregarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {
  latitud= 0;
  longitud = 0;
  tipo:string='';
  copa:string='';
  tronco:string='';
  foto:string ='';
  db:firebase.firestore.Firestore;
  user:firebase.User;
  storage: firebase.storage.Storage;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, private geolocation: Geolocation) {
    this.foto = this.navParams.get('foto');
    this.storage = firebase.storage();
    this.user=firebase.auth().currentUser;
    this.db= firebase.firestore();
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitud= resp.coords.latitude;
      this.longitud= resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPage');
  }
  subirImagen(){
    let trees ={
      tipo: this.tipo,
      copa: this.copa,
      tronco: this.tronco,
      latitud: this.latitud,
      longitud: this.longitud,
      time: firebase.firestore.FieldValue.serverTimestamp(),
      url: '',
      user: this.user.uid
      
    };
    let loading = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loading.present();

    this.db.collection('trees').add(trees)
    .then(ref=>{
      let nombre =ref.id;

      let uploadTask =this.storage.ref('trees/'+nombre + '.jpeg').putString(this.foto, 'data_url');
        uploadTask.then(exito=>{
          loading.dismiss();
          let url = exito.downloadURL;
          ref.update({url: url});
          this.navCtrl.pop();
        })
        .catch(error=>{
          console.log(JSON.stringify(error));
        });
    })
    }

    addDocument(collection:string, obj:any){
      this.db.collection(collection).add(obj)
      .then((res:any)=>{
        console.log('agregado');
        let alert =this.alertCtrl.create({
          title: "EXITO",
          subTitle: "Se agrego el arbolito",
          buttons: ["Ok"]
        });
        alert.present();
        this.navCtrl.pop();
      })
      .catch((error:any)=>{
        console.log(error);
        let alert =this.alertCtrl.create(
          {
          title: "EXITO",
          subTitle: "Se agrego el arbolito",
          buttons: ["Ok"]
          }
         );
         alert.present();
      
    });
  }

}