# Backstory
Today is the June of 2023. Recently `Google Authenticator` has just been updated their icon from `G` into `six sticks`. Together with the icon update, they also updated the app with some abomination of feature: `cloud sync` that thanks for it, it duplicate the authenticator that I have in my android phone, iphone, and any other source from 30-ish to become 100+ of duplication. They also lack the feature to:
- search
- filter
- clean duplicate
- fingerprint authentication
- proper cloud sync
So I create this project to make my `dream authenticator` with the goal in mind while also learning `expo`. Right now I mainly a `react-native` developer and have already know expo for like 5 years, but haven't get any chance to use it yet. So for this personal project, I decided to use `expo` and build what I want while learning new things.

# How to do run

## Prerequisites
- Node.JS (i used node.js 20)
- [expo](https://expo.dev/)

## Running android
- `npm run build:android:local-dev`
- install the `.apk` file to your emulator
- `npm start`
- press `a`

# How to build

## Prerequisites
- Node.JS
- Linux/Mac OS, windows isn't supported by `eas`

## Building android
- `npm run build:android:apk` to build using `eas` server
or
- `npm run build:android:local-apk` to build on your own machine