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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  
  rootPage: any = ChangeLangPage;
  activePage: any = HomePage;
  pages: Array<{ title: string, component: any }>;
  isRTL: Boolean = false;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen:
    SplashScreen, private translateService: TranslateService, private events: Events,
    private geofenceService: GeofenceService,
    private connectionService: ConnectionService,
    private alertCtrl:AlertController,
    private push:Push) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    events.subscribe(LanguageService.UPDATE_MENU_LANGUAGE_EVENT, _ => {
      this.updateMenuLanguage();
    });
  }
  private updateMenuLanguage() {
    this.pages = this.pagesMap[window.localStorage['mylanguage']];
  }

  private pagesMap: PagesMap = {
    'en': [
      { title: 'HOME', component: HomePage },
      { title: 'DAILY PROGRAM SCHEDULE', component: SchedPage },
      { title: 'WE ARE ONE', component: WeAreOnePage },
      { title: 'NEWS AND UPDATES', component: NewsAndUpdatesPage },
      { title: '#VCON18 MERCHANDISE', component: MerchPage },
      { title: 'MAKE YOUR V-CON MARK', component: MarkPage },
      { title: '#VCON18 WALLPAPERS', component: DownloadsPage },
      { title: 'CHAT WITH VOLT', component: VoltChatPage },
      { title: 'FAQs', component: FaqsPage },
      { title: 'CONTACT US', component: ContactPage },
      { title: 'SELECT LANGUAGE', component: ChangeLangPage }
    ],
    'fr': [
      { title: 'ACCUEIL', component: HomePage },
      { title: 'PROGRAMME QUOTIDIEN', component: SchedPage },
      { title: 'NOUS SOMMES UN', component: WeAreOnePage },
      { title: 'ACTUALITÉS ET MISES À JOUR', component: NewsAndUpdatesPage },
      { title: 'PRODUITS DU #VCON18', component: MerchPage },
      { title: 'FAITES VOTRE MARQUE V-CON', component: MarkPage },
      { title: 'FONDS D’ÉCRAN TÉLÉCHARGEABLES DU #VCON18', component: DownloadsPage },
      { title: 'Discuter avec Volt', component: VoltChatPage },
      { title: 'FAQs', component: FaqsPage },
      { title: 'NOUS CONTACTER', component: ContactPage },
      { title: 'CHOISIR LA LANGUE', component: ChangeLangPage }
    ],
    'ru': [
      { title: 'ГЛАВНАЯ', component: HomePage },
      { title: 'ПРОГРАММА КАЖДОГО ДНЯ', component: SchedPage },
      { title: 'МЫ ЕДИНЫ', component: WeAreOnePage },
      { title: 'НОВОСТИ И ОБЪЯВЛЕНИЯ', component: NewsAndUpdatesPage },
      { title: 'ТОВАРЫ #VCON18', component: MerchPage },
      { title: 'ТВОЙ ЛИЧНЫЙ ЗНАЧОК V-CON', component: MarkPage },
      { title: 'СКАЧИВАЕМЫЕ ОБОИ #VCON18', component: DownloadsPage },
      { title: 'Чат с Volt', component: VoltChatPage },
      { title: 'ВОПРОСЫ-ОТВЕТЫ', component: FaqsPage },
      { title: 'КОНТАКТЫ', component: ContactPage },
      { title: 'ВЫБРАТЬ ЯЗЫК', component: ChangeLangPage }
    ],
    'tr': [
      { title: 'ANA SAYFA', component: HomePage },
      { title: 'GÜNLÜK PROGRAM AKIŞI', component: SchedPage },
      { title: 'BİZ BİRİZ', component: WeAreOnePage },
      { title: 'HABERLER & GÜNCELLEMELER', component: NewsAndUpdatesPage },
      { title: '#VCON18 ÜRÜNLERİ', component: MerchPage },
      { title: 'V-CON İZİNİZİ OLUŞTURMAK', component: MarkPage },
      { title: '#VCON18 İNDİRİLEBİLEN DUVAR KAĞITLARI', component: DownloadsPage },
      { title: 'Volt ile sohbet et', component: VoltChatPage },
      { title: 'SSS', component: FaqsPage },
      { title: 'BİZİMLE İLETİŞİME GEÇİN', component: ContactPage },
      { title: 'DİL SEÇİNİZ', component: ChangeLangPage }
    ],
    'id': [
      { title: 'BERANDA', component: HomePage },
      { title: 'JADWAL PROGRAM HARIAN', component: SchedPage },
      { title: 'KITA ADALAH SATU', component: WeAreOnePage },
      { title: 'BERITA & UPDATE', component: NewsAndUpdatesPage },
      { title: 'BARANG DAGANGAN #VCON18', component: MerchPage },
      { title: 'BUAT TANDA V-CON ANDA', component: MarkPage },
      { title: 'WALLPAPER #VCON18 YANG DAPAT DIUNDUH', component: DownloadsPage },
      { title: 'Chat dengan Volt', component: VoltChatPage },
      { title: 'TANYA JAWAB', component: FaqsPage },
      { title: 'HUBUNGI KAMI', component: ContactPage },
      { title: 'PILIH BAHASA', component: ChangeLangPage }
    ],
    'ar': [
      { title: 'الرئيسية', component: HomePage },
      { title: 'جدول البرنامج اليومي', component: SchedPage },
      { title: 'جميعنا واحد', component: WeAreOnePage },
      { title: 'أخبار ومستجدات', component: NewsAndUpdatesPage },
      { title: 'معروضات #VCON18', component: MerchPage },
      { title: 'ضع علامتك للـ V-Con', component: MarkPage },
      { title: 'صور خلفيات #VCON18 الحصرية', component: DownloadsPage },
      { title: 'الدردشة مع فولت', component: VoltChatPage },
      { title: 'أسئلة متكررة', component: FaqsPage },
      { title: 'اتصل بنا', component: ContactPage },
      { title: 'اختار اللغة', component: ChangeLangPage }
    ]
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.translateService.setDefaultLang('en');
      this.translateService.use('en');
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
