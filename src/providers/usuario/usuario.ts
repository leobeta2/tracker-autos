import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { isRightSide } from 'ionic-angular/umd/util/util';


@Injectable()
export class UsuarioProvider {

  constructor(private afDB: AngularFirestore) {
    
  }

  verificaUsuario(clave: string){

    clave = clave.toLocaleLowerCase();
    return new Promise((resolve,reject)=> {
      this.afDB.doc(`/usuarios/${clave}`) // me subscribo para verificar cambios
        .valueChanges().subscribe( data => {
          console.log(data);

          resolve();
          
        });
    });
  }

}
