import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, Toast } from 'ionic-angular';
import { DownloadsPage } from '../downloads/downloads';
import { NewslandingPage } from '../newslanding/newslanding';
import { WeAreOnePage } from '../we-are-one/we-are-one';
import { MarkPage } from '../mark/mark';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { GoogleAnalyticsService } from '../../app/services/analytics.service';
import { Storage } from '@ionic/storage';
import { LANGUAGE_KEY } from '../../app/app.constants';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  _seconds: number;
  _minutes: number;
  _hours: number;
  _days: number;
  _diff: number;
  subscription: Subscription;
  _dateNow: Date;
  _VDate: Date;
  _regDay:Date;
  dayValue: string;
  private isLeaving: boolean = false;
  myNews = [];
  hideCountdown: boolean = false;
  private toastReload: Toast;
  constructor(public navCtrl: NavController,
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    private http: Http,
    private gaSvc:GoogleAnalyticsService,
    private storage:Storage) {
      this.getNews();

  }
  ionViewDidEnter() {
    this.gaSvc.gaTrackPageEnter('Home Page');
    this._VDate = new Date("2018-09-08T00:00:00+04:00");
    this._regDay= new Date("2018-09-07T00:00:00+04:00");
    this._dateNow = new Date();
    if (this._dateNow >= this._regDay) {
      this.hideCountdown = true;
      this.checkDateValue();
      this.subscription.unsubscribe();
    }
    else
      this.countDown();
    
  }
  checkDateValue() {
    if (this._dateNow.getMonth() + 1 === 9 && this._dateNow.getDate() === 7) {
      this.dayValue = "Registration"
    } else if (this._dateNow.getMonth() + 1 === 9 && this._dateNow.getDate() === 8) {
      this.dayValue = "1"
    } else if (this._dateNow.getMonth() + 1 === 9 && this._dateNow.getDate() === 9) {
      this.dayValue = "2"
    } else if (this._dateNow.getMonth() + 1 === 9 && this._dateNow.getDate() === 10) {
      this.dayValue = "3"
    } else if (this._dateNow.getMonth() + 1 === 9 && this._dateNow.getDate() === 11) {
      this.dayValue = "4"
    } else if (this._dateNow.getMonth() + 1 === 9 && this._dateNow.getDate() === 12) {
      this.dayValue = "5"
    } else {
      this.dayValue = " ";
    }
  }
  ionViewDidLeave() {
    this.isLeaving = true;
    if (this.toastReload)
      this.toastReload.dismiss();
  }
  GoToDownloads() {
    this.navCtrl.setRoot(DownloadsPage);
  }
  GoToNews(id: String) {
    this.navCtrl.push(NewslandingPage, {
      id: id
    });;
  }
  GoToOne() {
    this.navCtrl.setRoot(WeAreOnePage);
  }
  GoToMark() {
    this.navCtrl.setRoot(MarkPage);
  }
  getNews() {
    this.myNews = [];
    let loadingPopup = this.loadingController.create({
      content: 'Verifying...'
    });
    loadingPopup.present();
    this.storage.get(LANGUAGE_KEY).then(lang=>{
      let body = new URLSearchParams();
      body.set('action', 'getOldsNews');
      body.set('count', '4');
      body.set('page', '1');
      body.set('language', lang);
  
      let options = new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      });
      this.http.post('http://cums.the-v.net/site.aspx', body, options)
        .timeout(20000)
        .subscribe(response => {
          try {
            this.myNews = response.json();
            loadingPopup.dismiss();
          } catch (e) {
            
            let toast = this.toastCtrl.create({
              message: 'Something went wrong! Reload and Try again.',
              position: 'bottom',
              showCloseButton: true,
              closeButtonText: 'Reload'
            });
            toast.onDidDismiss(() => {
              if (!this.isLeaving)
                this.getNews();
            })
            toast.present();
            this.toastReload = toast;
            loadingPopup.dismiss();
          }
        }, e => {
          let toast = this.toastCtrl.create({
            message: 'Something went wrong! Reload and Try again.',
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'Reload'
          });
          toast.onDidDismiss(() => {
            if (!this.isLeaving)
              this.getNews();
          })
          toast.present();
          this.toastReload = toast;
          loadingPopup.dismiss();
        }, () => {
        });
    })
  }


  countDown() {
    this.subscription = Observable.interval(1000)
      .subscribe((x) => {
        this._diff = this._VDate.getTime() - new Date().getTime();
        if (this._diff < 0) {
          this.subscription.unsubscribe();
        }
        else {
          this._days = this.getDays(this._diff);
          this._hours = this.getHours(this._diff);
          this._minutes = this.getMinutes(this._diff);
          this._seconds = this.getSeconds(this._diff);
        }
      });
  }
  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }
}
