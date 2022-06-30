# React Native Template

This is a demo app for Eurisko as a React Native code challenge.
It starts with an authenticated login that takes the user to a page with a search bar and a list of articles.
The user can then scroll to see the articles and load more as the list reaches the end.
In addition, the user have a search bar at the top where it filters the articles and only shows the ones that matches the typed text by the user.

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [react-navigation/native](https://reactnavigation.org/) Routing and navigation library.
- [react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator/) To transition between screens.
- [react-native-animatable](https://github.com/oblador/react-native-animatable) Declarative transitions and animations for React Native.
- [react-native-toast-message](https://github.com/calintamas/react-native-toast-message) Animated toast message component for React Native.
- [react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/)  Customizable Icons for React Native 
- [react-redux](https://react-redux.js.org/) React bindings for Redux
- [redux](https://redux.js.org/) for state management.
 
## Folder structure

This template follows a very simple project structure:

 
  - `actions`: This folder contains all actions that can be dispatched to redux.
  - `reducers`: This folder should have all your reducers.
  - `constants`: Folder to store any kind of constant that you have.
  - `store`: Folder to put all redux middlewares and the store.
  - `screens`: Folder that contains all application screens.
  - `helpers`: Useful functions.
  - `App.js`: Main component that starts the whole app.
  - `index.js`: Point of application as per React-Native standards.
  - `vars.js`: contains necessary variables to use through the app like the api link.

## Download the app
`npm install`
then
`npm run android`

## start the app

`npm start`
