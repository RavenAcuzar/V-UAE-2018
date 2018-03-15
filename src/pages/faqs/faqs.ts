import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FaqsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-faqs',
  templateUrl: 'faqs.html',
})
export class FaqsPage {
  private currentLang;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.currentLang = window.localStorage['mylanguage'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FaqsPage');
  }

}
