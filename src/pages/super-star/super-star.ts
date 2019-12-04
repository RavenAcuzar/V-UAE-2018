import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Storage } from '@ionic/storage';
import { IF_VOTED } from '../../app/app.constants';
import { HomePage } from '../home/home';

/**
 * Generated class for the SuperStarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-super-star',
  templateUrl: 'super-star.html',
})
export class SuperStarPage {

  dateNow: Date;
  startVoting;
  teamSelected;
  teams;
  winner;
  irid: string = "";
  options;
  url = "http://bt.the-v.net/service/api.aspx";
  hideVotingClosed: boolean = true;
  hideVoting: boolean = true;
  hideWinner: boolean = true;
  hidePreVote: boolean = false;
  hideThanks: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http: Http,
    private storage: Storage,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    });
    this.dateNow = new Date();
    if(this.dateNow.getMonth()+1===9 && this.dateNow.getDate() === 11 && this.dateNow.getFullYear() === 2018)
    {
      this.checkVotingStat();
    }
    if(this.dateNow.getMonth()+1 >=9 && this.dateNow.getDate() >= 12 && this.dateNow.getFullYear() === 2018)
    {
      this.checkWinner();
    }
  }
  checkWinner() {
    let body = new URLSearchParams();
    body.set('action','VCONGetWinner');
    this.http.post(this.url, body,this.options)
    .subscribe(res=>{
      if(res.text()!=''){
        this.winner = res.text();
        this.hidePreVote = true;
        this.hideWinner = false;
      }else{
        this.checkVotingStat();
      }
    })
  }
  checkVotingStat() {
    let load: any = this.loadingCtrl.create({
      spinner: "crescent",
      content: "Loading...",
      enableBackdropDismiss: true
    });
    let body = new URLSearchParams();
    body.set('action', 'VCONVotingStatus');
    this.http.post(this.url, body, this.options)
      .subscribe(res => {
        if (res.text() == "Active") {
          this.hidePreVote = true;
          this.setupVoting();
        }
        else {
          this.hidePreVote = true;
          this.hideVotingClosed = false;
        }
      }, error => {
        load.dismiss();
        //show toast error 
      },
        () => {
          load.dismiss();
        })
  }
  setupVoting() {
    let alert = this.alertCtrl.create({
      title: 'Input Your IRID to Vote',
      message: 'Please input your IRID to submit a vote.',
      enableBackdropDismiss: false,
      inputs: [
        {
          name: 'irid',
          placeholder: 'IRID'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            this.navCtrl.setRoot(HomePage);
          }
        },
        {
          text: 'OK',
          handler: data => {
            if (data.irid != '') {
              this.irid = data.irid;
              console.log(this.irid);
              this.checkVoter(data.irid);
            }
            else {
              return false;
            }
          }
        }
      ]
    });
    alert.present();
  }
  checkVoter(irid) {
    let body = new URLSearchParams();
    body.set('action', 'VCONCheckVote');
    body.set('irid', irid);
    this.http.post(this.url, body, this.options)
      .subscribe(res => {
        if (res.text() == "True") {
          this.loadTeams();
        }
        else {
          this.hideThanks = false;
        }
      })
  }
  loadTeams() {
    let body = new URLSearchParams();
    body.set('action', 'VCONGetTeams');
    this.http.post(this.url, body, this.options)
      .subscribe(res => {
        this.teams = res.json();
        this.hideVoting = false;
      })
  }
  sendVote() {
    if (this.teamSelected != '') {
      let body = new URLSearchParams();
      body.set('action', 'VCONSubmitVote')
      body.set('id', this.teamSelected);
      body.set('irid', this.irid)
      this.http.post(this.url, body, this.options)
        .subscribe(res => {
          if (res.text() == "True") {
            this.hideVoting = true;
            this.hideThanks = false;
          }
          else {
            //error sending vote
          }
        })
    }
  }

}
