import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Menu } from 'ionic-angular';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Push } from '@ionic-native/push';
import { SQLite } from "@ionic-native/sqlite";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FaqsPage } from '../pages/faqs/faqs';
import { ContactPage } from '../pages/contact/contact';
import { DownloadsPage } from '../pages/downloads/downloads';
import { ChangeLangPage } from '../pages/change-lang/change-lang';
import { NewsAndUpdatesPage } from '../pages/news-and-updates/news-and-updates';
import { NewslandingPage } from '../pages/newslanding/newslanding';
import { WeAreOnePage } from '../pages/we-are-one/we-are-one';
import { MarkPage } from '../pages/mark/mark';
import { SchedPage } from '../pages/sched/sched';
import { MerchPage } from '../pages/merch/merch';
import { SplashNextPage } from '../pages/splash-next/splash-next';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { Base64ToGallery } from "@ionic-native/base64-to-gallery";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Camera } from "@ionic-native/camera";
import { Crop } from "@ionic-native/crop";
import { PhotoLibrary } from "@ionic-native/photo-library";
import { Geofence } from '@ionic-native/geofence';
import { GeofenceService } from './services/geofence.service';
import { IonicStorageModule } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { ConnectionService } from './services/connection.service';
import { VoltChatService } from './services/volt-chat.service';
import { VoltChatPage } from '../pages/volt-chat/volt-chat';
import { ChatPopoverPage } from './popover';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FaqsPage,
    ContactPage,
    DownloadsPage,
    ChangeLangPage,
    NewsAndUpdatesPage,
    NewslandingPage,
    WeAreOnePage,
    MarkPage,
    SchedPage,
    MerchPage,
    SplashNextPage,
    VoltChatPage,
    ChatPopoverPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FaqsPage,
    ContactPage,
    DownloadsPage,
    ChangeLangPage,
    NewsAndUpdatesPage,
    NewslandingPage,
    WeAreOnePage,
    MarkPage,
    SchedPage,
    MerchPage,
    SplashNextPage,
    VoltChatPage,
    ChatPopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Base64ToGallery, File, FileTransfer, AndroidPermissions,
    PhotoLibrary, Crop, Camera, SocialSharing, Geofence, GeofenceService, 
    Network,ConnectionService, Push, SQLite, VoltChatService
  ]
})
export class AppModule {}
