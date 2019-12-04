import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { HomePage } from '../pages/home/home';
import { FaqsPage } from '../pages/faqs/faqs';
import { ContactPage } from '../pages/contact/contact';
import { DownloadsPage } from '../pages/downloads/downloads';
import { ChangeLangPage } from '../pages/change-lang/change-lang';
import { NewsAndUpdatesPage } from '../pages/news-and-updates/news-and-updates';
import { WeAreOnePage } from '../pages/we-are-one/we-are-one';
import { MarkPage } from '../pages/mark/mark';
import { SchedPage } from '../pages/sched/sched';
import { MerchPage } from '../pages/merch/merch';
import { LanguageService } from './services/language.service';
import { GeofenceService } from './services/geofence.service';
import { ConnectionService } from './services/connection.service';
import { NewslandingPage } from '../pages/newslanding/newslanding';
import { VoltChatPage } from '../pages/volt-chat/volt-chat';
import { AskDatoPage } from '../pages/ask-dato/ask-dato';
import { SurveyPage } from '../pages/survey/survey';
import { Storage } from '@ionic/storage';
import { LANGUAGE_KEY } from './app.constants';
import { SuperStarPage } from '../pages/super-star/super-star';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  
  rootPage: any;
  activePage: any = HomePage;
  pages: Array<{ title: string, component: any }>;
  isRTL: Boolean = false;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen:
    SplashScreen, private translateService: TranslateService, private events: Events,
    private geofenceService: GeofenceService,
    private connectionService: ConnectionService,
    private alertCtrl:AlertController,
    private push:Push,
    private storage:Storage) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'SIDEMENU.HOME', component: HomePage },
      { title: 'SIDEMENU.DAILY_PROG', component: SchedPage },
      { title: 'SIDEMENU.WE_ARE_ONE', component: WeAreOnePage },
      { title: 'SIDEMENU.NEWS_UPS', component: NewsAndUpdatesPage },
      { title: 'SIDEMENU.MERCH', component: MerchPage },
      { title: 'SIDEMENU.MARK', component: MarkPage },
      { title: 'SIDEMENU.DOWNLOAD', component: DownloadsPage },
      { title: 'SIDEMENU.CHAT', component: VoltChatPage },
      { title: 'SIDEMENU.ASK_DATO', component: AskDatoPage },
      { title: 'SIDEMENU.SURVEY', component: SurveyPage },
      { title: 'SIDEMENU.FAQS', component: FaqsPage },
      { title: 'SIDEMENU.CONTACT', component: ContactPage },
      { title: 'SIDEMENU.SELECT_LANG', component: ChangeLangPage },
      { title: 'V-Con Superstar', component: SuperStarPage }
    ];
  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get(LANGUAGE_KEY).then(lang=>{
        if(lang){
          this.translateService.setDefaultLang(lang);
          this.translateService.use(lang);
          this.rootPage = HomePage;
          this.segmentChanged(lang);
        }else{
          this.translateService.setDefaultLang('en');
          this.translateService.use('en');
          this.rootPage = ChangeLangPage;
        }
      });
      this.connectionService.checkNetworkConnection();
      this.geofenceService.setupEventGeofence();
      this.pushsetup();
      this.platform.setDir('ltr', true);
      this.platform.setDir('rtl', false);
    }, e => {
      console.log(JSON.stringify(e));
    }).catch(_ => {
      alert('Cannot load application!');
    });
    
  }
  segmentChanged(lang) {
    if(lang == "ar"){
      this.platform.setDir('rtl', true);
      this.platform.setDir('ltr', false); 
    }
    else
    {
      this.platform.setDir('ltr', true);
      this.platform.setDir('rtl', false);
    }
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }
  checkActive(p) {
    return p == this.activePage;
  }
  pushsetup() {
    const options: PushOptions = {
      android: {
        senderID: '597577788490',
        topics: ["VCON_ALL_USERS"]
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false',
        topics: ["VCON_ALL_USERS"]
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((data: any) => {
      if (!data.additionalData.coldstart) {
        if (data.additionalData.dataid) {
          let youralert = this.alertCtrl.create({
            title: data.title,
            message: data.message,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              },
              {
                text: 'View',
                handler: () => {
                  this.nav.push(NewslandingPage, {
                    id: data.additionalData.dataid
                  });
                }
              }
            ]
          });
          youralert.present();
        }
        else {
          let youralert = this.alertCtrl.create({
            title: data.title,
            message: data.message,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ]
          });
          youralert.present();
        }
      }
      else {
        if (data.additionalData.dataid) {
          this.nav.push(NewslandingPage, {
            id: data.additionalData.dataid
          });
        }
      }


    });

    pushObject.on('registration').subscribe((registration: any) => {
      console.log(registration);
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
}
interface PagesMap {
  [lang: string]: [any];
}
