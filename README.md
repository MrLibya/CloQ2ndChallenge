# CloQ Second Challenge
This is just normal CRUD application ( poems ), The project uses React Native (JavaScript) - React navigation - React Native Firebase (Auth + Firestore) + Native module to get device info

### Directory Architecture

* `src/components` Reusable component being used throughout the app.
* `src/styles` Rreusable Styles, color and themes.
* `src/navigation` All the react navigation setup can be found.
* `src/screens` The screens of the app.
* `src/modules` This folder contain custom native modules have been used for this app

## Modules
- Device Info Module ( it includes types), This module only work on android for now.
  - function getSystemDetail() -> returns key-value data for some of device info.
  - function getBattery() -> returns number(float) for the percentage of the battery.

## Notes
- There's no styling on the app

## Installation

```bash
  yarn install
  yarn android (to run on android simulator )
```
