# ![App Icon](https://github.com/RavenAcuzar/V-UAE-2018/blob/master/resources/android/icon/drawable-xhdpi-icon.png) 
# V-UAE 2018 (OLD Version)

The V-UAE 2018 Mobile App is made for all participants of V-UAE 2018.

The V-UAE 2018 mobile app is made for all V-UAE 2018 participants, who are determined and inspired to lead. It is packed with comprehensive and dynamic features such as a crowd-sourced feed, exhibitors’ page, personalized page for all your saved favourites, notes, #VMalaysia2018-marked photo generator, exclusive merchandise dock, regular news and updates, and a special dock for all V-UAE 2018 videos! You can even select the language of your choice to use the app in English, Arabic, Bahasa-Indonesia, French, Russian, or Turkish!

Download now on [AppStore](https://apps.apple.com/ph/app/v-uae-vuae2018/id1144318387)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Setup the following requirements to your local machine.

- [Node.js](https://nodejs.org/en/)
- [Setup Ionic](https://ionicframework.com/docs/intro/cli)
- [Setup Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [IOS Development](https://ionicframework.com/docs/developing/ios)
- [Android Development](https://ionicframework.com/docs/developing/android)

### Initialize

Create ionic starter app.
```
ionic start VMalaysiaApp https://github.com/RavenAcuzar/V-UAE-2018/
```
Initialize node packages (This is a very old project. Possible errors can be encountered with deprecated packages used.)
```
npm i
```
Run the app.
```
ionic serve
```
To add platform (Android/IOS)
```
ionic cordova platform add android
```
```
ionic cordova platform add ios
```

### Build App

Run the following commands for building the app.
(Android) For generating release apk add `--prod --release`
```
ionic cordova build android
```
(IOS) For generating release apk add `--prod`. Open project in XCode then run build, Archive, then upload to Appstore.
```
ionic cordova build ios
```

## Key Features
- Downloadable wallpapers.
- Downloadable photo frame generator with social sharing.
- Content Translations
- Integrated with Firebase Push Notifications
- Integrated with Dialogflow chat bot

## Built with

* Ionic 3 (Ionic-Angular Framework)
* Typescript
* HTML, Css/Scss

## Authors and Contributors

* **Rico Raven Acuzar** - [linkedin.com/in/rico-raven/](https://www.linkedin.com/in/rico-raven/)
