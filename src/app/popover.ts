import { ViewController, NavController, NavParams, AlertController, ToastController } from "ionic-angular";
import { Component, ChangeDetectorRef } from "@angular/core";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs/Observable";
import { VoltChatService } from "./services/volt-chat.service";

@Component({
    template: `
      <ion-list class="playlist-popover-page" no-lines>
        <button ion-item (click)="clearMessages()">Clear messages</button>
      </ion-list>
    `
  })
  export class ChatPopoverPage {
  
    constructor(
      private chatService: VoltChatService,
      private alertController: AlertController,
      private viewController: ViewController,
      private navCtrl: NavController
    ) { }
  
    clearMessages() {
      this.viewController.dismiss();
      let unknownError = (e) => {
        console.error(JSON.stringify(e));
        let alert = this.alertController.create({
          title: 'Oops!',
          message: 'An error occurred while trying to clear your messages. Please try again.',
          buttons: [{
            text: 'OK', handler: () => {
              alert.dismiss();
              return true;
            }
          }]
        });
      };
  
      this.chatService.deleteUserConversation().catch(e => {
        if (e instanceof Error) {
          console.log(e);
        } else {
          unknownError(e);
        }
      })
    }
  }