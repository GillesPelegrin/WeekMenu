// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {FirebaseOptions} from "@firebase/app";

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAmgtUMjjRvo29I6EyRtK06to2ThGyR6-o",
    authDomain: "weekmenu-f6c98.firebaseapp.com",
    projectId: "weekmenu-f6c98",
    storageBucket: "weekmenu-f6c98.appspot.com",
    messagingSenderId: "223068671526",
    appId: "1:223068671526:web:cb3b5a80e5f450735ae0e7",
    measurementId: "G-KXLXD2XY62"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
