import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);

  constructor() {
    app.
  }
}
