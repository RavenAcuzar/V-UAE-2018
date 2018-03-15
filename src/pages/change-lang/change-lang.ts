import { Component } from '@angular/core';
import { NavController, NavParams, Events, Platform } from 'ionic-angular';
import { SplashNextPage } from '../splash-next/splash-next';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../app/services/language.service';

/**
 * Generated class for the ChangeLangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-lang',
  templateUrl: 'change-lang.html',
})
export class ChangeLangPage {
  SplashnextPage = SplashNextPage;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private translateService:TranslateService, private events: Events,
  private platform: Platform) {
    
  }
  segmentChanged(event) {
    if(event == "ar"){
      this.platform.setDir('rtl', true);
      this.platform.setDir('ltr', false); 
    }
    else
    {
      this.platform.setDir('ltr', true);
      this.platform.setDir('rtl', false);
    }
    this.translateService.use(event);
    
    window.localStorage['mylanguage'] = event;
    LanguageService.publishLanguageChange(this.events);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLangPage');
  }

}
