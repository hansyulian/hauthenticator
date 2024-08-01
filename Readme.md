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
