import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { isRightSide } from 'ionic-angular/umd/util/util';
import { Platform } from 'ionic-angular';
import { Storage } from "@ionic/storage";


@Injectable()
export class UsuarioProvider {

  clave: string;
  user: any = {};

  constructor(private afDB: AngularFirestore,
              private platform: Platform,
              private storage: Storage) {
    
  }

  verificaUsuario(clave: string){

    clave = clave.toLocaleLowerCase();
    return new Promise((resolve,reject)=> {
      this.afDB.doc(`/usuarios/${clave}`) // me subscribo al objeto para verificar cambios
        .valueChanges().subscribe( data => {
          console.log(data);
          if (data) {
            this.clave = clave;
            this.user = data;
            this.guardarStorage();
            resolve(true);  
          } else {
            resolve(false);
          }

          resolve();
          
        });
    });
  }

  guardarStorage(){
    if (this.platform.is('cordova')) {
      this.storage.set('clave',this.clave);
    } else {
      localStorage.setItem('clave', this.clave);
    }
  }

  cargarStorage(){
    return new Promise((resolve,reject)=>{
      if (this.platform.is('cordova')) {

        this.storage.get('clave').then(val => {
          if(val){
            this.clave = val;
            resolve(true);
          }else{
            resolve(false);
          }
        })


        this.storage.set('clave',this.clave);


      } else {
        if(localStorage.getItem('clave')){
          this.clave = localStorage.getItem('clave');
          resolve(true);
        }else{
          resolve(false);
        }
        
      }
    });
  }

}
