import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Platform, LoadingController, AlertController } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

/**
 * Generated class for the MarkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mark',
  templateUrl: 'mark.html',
})
export class MarkPage {

  @ViewChild('editor') editorRef;
  badgeKind: string = null;
  isImageSelected: boolean = false;
  isBadgeSelected: boolean = false;
  private badgeKindImgPath: string = null;
  private imageData: string = null;
  private croppedImagePath: string = null;

  constructor(private platform: Platform,
    private navCtrl: NavController,
    private base64ToGallery: Base64ToGallery,
    private socialSharing: SocialSharing,
    private loading: LoadingController,
    private photoLibrary: PhotoLibrary,
    private alert: AlertController,
    private camera: Camera,
    private crop: Crop) {
  }
  
  choosePhoto() {
    const loadPhoto: CameraOptions = {
      quality: 50,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
    };
    let imageLoad = this.loading.create({
      content: 'Waiting for image to load...'
    });
    imageLoad.present();

    let localErrCallback = e => {
      if (e !== 'Selection cancelled.' && (e.code && e.code !== 'userCancelled'))
        this.errCallback(e);
      imageLoad.dismiss();
    }

    this.camera.getPicture(loadPhoto).then(selectedImagePath => {
        this.crop.crop(selectedImagePath).then(croppedImagePath => {
          console.log(croppedImagePath)
          let canvas = <HTMLCanvasElement>this.editorRef.nativeElement;
          let context = canvas.getContext('2d');
  
          if (this.isBadgeSelected) {
            let overlayImage = new Image();
            overlayImage.onload = () => {
              let baseImage = new Image();
              baseImage.onload = () => {
                canvas.width = overlayImage.width;
                canvas.height = overlayImage.height;
  
                context.drawImage(baseImage, 0, 0, overlayImage.width, overlayImage.height);
                context.drawImage(overlayImage, 0, 0, overlayImage.width, overlayImage.height);
  
                this.imageData = canvas.toDataURL();
                imageLoad.dismiss();
              };
              baseImage.src = this.croppedImagePath;
            };
            overlayImage.src = this.badgeKindImgPath;
          } else {
            let baseImage = new Image();
            baseImage.onload = () => {
              canvas.width = baseImage.width;
              canvas.height = baseImage.height;
  
              context.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height);
              imageLoad.dismiss();
            };
            baseImage.src = croppedImagePath;
          }
  
          this.croppedImagePath = croppedImagePath;
          this.isImageSelected = true;
  
        }, localErrCallback);
      }, localErrCallback);
  }

  badgeValueChanged() {
    switch (this.badgeKind) {
      case '1':
        this.badgeKindImgPath = 'assets/imgs/overlay-vcon18.png';
        break;
      case '2':
        this.badgeKindImgPath = 'assets/imgs/overlay-v.png';
        break;
      default:
        this.isBadgeSelected = false;
        throw new Error('Unknown badge kind!');
    }
    this.isBadgeSelected = true;

    if (!this.isImageSelected) {
      let alert = this.alert.create({
        title: 'Oops',
        message: 'Select an image first!',
        buttons: [{
          text: 'OK',
          handler: () => { alert.dismiss(); }
        }],
        cssClass: 'alertDanger'
      });
      alert.present();
      return;
    }

    let applyLoad = this.loading.create({
      content: 'Processing your image...'
    });

    let canvas = <HTMLCanvasElement>this.editorRef.nativeElement;
    let context = canvas.getContext('2d');

    let overlayImage = new Image();
    overlayImage.onload = () => {
      let baseImage = new Image();
      baseImage.onload = () => {
        canvas.width = overlayImage.width;
        canvas.height = overlayImage.height;

        context.drawImage(baseImage, 0, 0, overlayImage.width, overlayImage.height);
        context.drawImage(overlayImage, 0, 0, overlayImage.width, overlayImage.height);

        this.imageData = canvas.toDataURL();
        applyLoad.dismiss();
      };
      baseImage.src = this.croppedImagePath;
    };
    overlayImage.src = this.badgeKindImgPath;
  }
  private errCallback(err) {
    console.error(JSON.stringify(err));
    let alert = this.alert.create({
      title: 'Oh no! :(',
      message: 'Something went wrong.',
      buttons: [{
        text: 'OK',
        handler: () => { alert.dismiss(); }
      }],
      cssClass: 'alertDanger'
    });
    alert.present();
  };

  savePhoto() {
    if (this.isImageSelected && this.isBadgeSelected) {
      let loading = this.loading.create({
        content: 'Saving image to gallery...'
      });
      loading.present();

      this.base64ToGallery.base64ToGallery(this.imageData, { prefix: '_img' }).then(libraryItem => {
        loading.dismiss();

        let alert = this.alert.create({
          title: 'Success!',
          message: 'Your image has been successfully saved to your gallery.',
          buttons: [{
            text: 'Share',
            handler: () => { this.share(libraryItem); }
          }, {
            text: 'OK',
            handler: () => { alert.dismiss(); }
          }],
          cssClass: 'alert'
        });
        alert.present();
      }, e => {
        console.error('Something went wrong!');
        this.errCallback(e);
      });
    } else if (!this.isImageSelected && !this.isBadgeSelected) {
      let alert = this.alert.create({
        title: 'Oops',
        message: 'Select an image and a badge first!',
        buttons: [{
          text: 'OK',
          handler: () => { alert.dismiss(); }
        }],
        cssClass: 'alertDanger'
      });
      alert.present();
    } else if (!this.isImageSelected) {
      let alert = this.alert.create({
        title: 'Oops',
        message: 'Select an image first!',
        buttons: [{
          text: 'OK',
          handler: () => { alert.dismiss(); }
        }],
        cssClass: 'alertDanger'
      });
      alert.present();
    } else if (!this.isBadgeSelected) {
      let alert = this.alert.create({
        title: 'Oops',
        message: 'Select a badge first!',
        buttons: [{
          text: 'OK',
          handler: () => { alert.dismiss(); }
        }],
        cssClass: 'alertDanger'
      });
      alert.present();
    }
  }

  private share(libraryItem: string) {
    let prefix = '';
    if (this.platform.is('android')) {
      prefix = 'file://';
    }

    let filepath = prefix + libraryItem;
    console.log('Filepath: ' + filepath);
    this.socialSharing.share('#VCON18', '', filepath).then((a) => {
      console.log(JSON.stringify(a));
      if (a) {
        let alert = this.alert.create({
          title: 'Success!',
          message: 'Your image has been successfully shared.',
          buttons: [{
            text: 'OK',
            handler: () => { alert.dismiss(); }
          }],
          cssClass: 'alert'
        });
        alert.present();
      }
    }).catch(e => {
      console.log(JSON.stringify(e));
    });
  }

  shareDirect(){
    if (this.isImageSelected && this.isBadgeSelected) {
      let loading = this.loading.create({
        content: 'Saving image to gallery...'
      });
      loading.present();

      this.base64ToGallery.base64ToGallery(this.imageData, { prefix: '_img' }).then(libraryItem => {
        loading.dismiss();
        this.share(libraryItem);
      }, e => {
        console.error('Something went wrong!');
        this.errCallback(e);
      });
    } else if (!this.isImageSelected && !this.isBadgeSelected) {
      let alert = this.alert.create({
        title: 'Oops',
        message: 'Select an image and a badge first!',
        buttons: [{
          text: 'OK',
          handler: () => { alert.dismiss(); }
        }],
        cssClass: 'alertDanger'
      });
      alert.present();
    } else if (!this.isImageSelected) {
      let alert = this.alert.create({
        title: 'Oops',
        message: 'Select an image first!',
        buttons: [{
          text: 'OK',
          handler: () => { alert.dismiss(); }
        }],
        cssClass: 'alertDanger'
      });
      alert.present();
    } else if (!this.isBadgeSelected) {
      let alert = this.alert.create({
        title: 'Oops',
        message: 'Select a badge first!',
        buttons: [{
          text: 'OK',
          handler: () => { alert.dismiss(); }
        }],
        cssClass: 'alertDanger'
      });
      alert.present();
    }
  }

}
