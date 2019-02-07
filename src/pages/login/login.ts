import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, AlertController, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	@ViewChild(Slides) slides:Slides;	

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public alertCtrl: AlertController,
          public loaginCtrl: LoadingController,
          public _usuarioProv: UsuarioProvider ) {
  }

  ionViewDidLoad() {
  	//para la barra de progreso de los slides
    this.slides.paginationType = 'progress';
    //para bloquear el slide
    this.slides.lockSwipes(true);
    //para asegurarse el bloqueo
    this.slides.freeMode = false;
  }

  mostrarInput(){
  	const prompt = this.alertCtrl.create({
      title: 'Ingrese Usuario',
      message: "Enter a name for this new album you're so keen on adding",
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role:'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: data => {
            console.log('Saved clicked');
            console.log(data);
            this.verificarUsuario(data.username);
          }
        }
      ]
    });
    prompt.present();
  }

  verificarUsuario(clave: string){
  	let loading = this.loaginCtrl.create({
  		content: 'Verificando'
  	});
    loading.present();
    
    this._usuarioProv.verificaUsuario(clave).then()

  	setTimeout(()=>{
  	loading.dismiss();
  }, 3000);
  }//fin verificar usuario

  

}
