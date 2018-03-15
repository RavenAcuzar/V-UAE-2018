import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Toast, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the MerchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-merch',
  templateUrl: 'merch.html',
})
export class MerchPage {
  @ViewChild(Slides) slides: Slides;
  merchSlides: Array<{ image: string }>;
  myMerchandise = [];
  private isLeaving: Boolean = false;
  private toastReload: Toast;
  private merchHide: Boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    protected http: Http, protected loadingController: LoadingController,
    protected toastCtrl: ToastController) {
    this.merchSlides = [
      { image: "./assets/imgs/slider-0.jpg" },
      { image: "./assets/imgs/slider-1.jpg" },
      { image: "./assets/imgs/slider-2.jpg" },
      { image: "./assets/imgs/slider-3.jpg" }
    ]
    this.getMerch();
  }
  ionViewDidEnter() {
    this.slides.autoplayDisableOnInteraction = false;
    if(window.localStorage['mylanguage']=="ar"){
      this.slides._rtl = true;
    }
  }

  getMerch() {
    let loadingPopup = this.loadingController.create({
      content: 'Verifying...'
    });
    loadingPopup.present();

    let url = 'http://cums.the-v.net/file.aspx';
    this.http.request(url)
      .timeout(20000)
      .subscribe((result: any) => {
        if (result._body == "") {
          this.merchHide = true;
          loadingPopup.dismiss();
        } else {
          this.merchHide = false;
          try {
            console.log(result._body);
            this.myMerchandise = JSON.parse(result._body);
          }
          catch (e) {
            let toast = this.toastCtrl.create({
              message: 'Something went wrong! Reload and Try again.',
              position: 'bottom',
              showCloseButton: true,
              closeButtonText: 'Reload'
            });
            toast.onDidDismiss(() => {
              if (!this.isLeaving)
                this.getMerch();
            })
            toast.present();
            this.toastReload = toast;
            loadingPopup.dismiss();
          }
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
            this.getMerch();
        })
        toast.present();
        this.toastReload = toast;
        loadingPopup.dismiss();
      }, () => {
      });
  }
  ionViewDidLeave() {
    this.isLeaving = true;
    if (this.toastReload)
      this.toastReload.dismiss();
  }
}
