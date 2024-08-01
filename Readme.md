# HAuthenticator

On July 2023, Google released a new update in Authenticator app that enable cloud save. The problem is that it causes a lot of duplicated records and it's a nightmare to cleanup. As a person who enable 2FA whenever available, it causes me to have around 1000 records of 4-5 duplicated entries each. The updated Authenticator also lack of search function that makes finding a single record among thousands duplicated entries a nightmare.

Then I started this personal project to create my own "Dream Authenticator" app. This app have the following features:

- Search record by name/issuer
- Sort by favourite -> name
- Export/Import compatible with Google's Authenticator protocol
- Export/Import by string input
- Add authenticator by scanning QR code
- Add authenticator manually by form
- Duplication removal
- Biometric authentication
- Google drive sync

# Prerequisites

- NodeJS (tested with v22)
-

# Development setup

1. `cp .env.example .env.local`
1. `npm -g i eas-cli` then `eas login`
1. `npm i`
1. build the debug apk, then install to emulator/device
1. `npm start`

# How To Build

- Cloud build: `eas build -p android`
- Local debug build: `eas build -p android --profile development --local`
- Local production build: `eas build -p android --profile apk --local`
