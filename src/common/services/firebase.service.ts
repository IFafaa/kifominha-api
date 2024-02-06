import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";

@Injectable()
export class FirebaseService {
  private readonly firebaseApp = firebase.app();
  private readonly storage: firebase.storage.Storage;

  constructor() {
    this.storage = firebase.app().storage();
  }

  getStorageInstance() {
    return this.storage;
  }
}
