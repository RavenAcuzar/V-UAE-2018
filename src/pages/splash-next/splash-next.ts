import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChangeLangPage } from '../change-lang/change-lang';


/**
 * Generated class for the SplashNextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-splash-next',
  templateUrl: 'splash-next.html',
})
export class SplashNextPage {
  Changelang = ChangeLangPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  GoToHome(){
    this.navCtrl.setRoot(HomePage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashNextPage');
  }

}
