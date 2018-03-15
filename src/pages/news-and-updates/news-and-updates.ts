import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Toast } from 'ionic-angular';
import { NewslandingPage } from '../newslanding/newslanding';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';

/**
 * Generated class for the NewsAndUpdatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news-and-updates',
  templateUrl: 'news-and-updates.html',
})
export class NewsAndUpdatesPage {
  private currentLang;
  myNews: any[];
  private isLeaving: boolean= false;
  toastReload:Toast;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private loadingController: LoadingController, private toastCtrl:ToastController,
  private http:Http) {
    this.currentLang = window.localStorage['mylanguage'];
  }

  ionViewDidLoad() {
    this.getNews();
  }
  ionViewDidLeave(){ 
    this.isLeaving=true;
    if (this.toastReload)
      this.toastReload.dismiss();
  }
  GoToNews(id: String){
    this.navCtrl.push(NewslandingPage, {
      id: id
    });;
  }
  
  getNews() {
    this.myNews = [];
    let loadingPopup = this.loadingController.create({
      content: 'Verifying...'
    });
    loadingPopup.present();

    let body = new URLSearchParams();
    body.set('action', 'getOldsNews');
    body.set('count', '10');
    body.set('page', '1');
    body.set('language', window.localStorage['mylanguage']);

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
          console.log(response.json());
          loadingPopup.dismiss();
        } catch (e) {
          let toast = this.toastCtrl.create({
              message: 'Something went wrong! Reload and Try again.',
              position: 'bottom',
              showCloseButton: true,
              closeButtonText: 'Reload'
            });
            toast.onDidDismiss(()=>{
              if(!this.isLeaving)
                this.getNews();
            })
            toast.present();
            this.toastReload=toast;
          loadingPopup.dismiss(); 
          console.log(response.json());
        }
      }, e=>{
          let toast = this.toastCtrl.create({
              message: 'Something went wrong! Reload and Try again.',
              position: 'bottom',
              showCloseButton: true,
              closeButtonText: 'Reload'
            });
            toast.onDidDismiss(()=>{
              if(!this.isLeaving)
                this.getNews();
            })
            toast.present();
            this.toastReload=toast;
          loadingPopup.dismiss();
      }, () => {
      });
  }

}
