import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleAnalyticsService } from '../../app/services/analytics.service';

/**
 * Generated class for the WeAreOnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-we-are-one',
  templateUrl: 'we-are-one.html',
})
export class WeAreOnePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private gaSvc:GoogleAnalyticsService) {
  }

  ionViewDidLoad() {
    this.gaSvc.gaTrackPageEnter('We Are One Page');
  }

}
