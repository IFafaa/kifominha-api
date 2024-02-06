import { Injectable } from "@nestjs/common";
import * as firebase from "firebase-admin";

@Injectable()
export class FirebaseService {
  private readonly firebaseApp = firebase.app();

  constructor() {}

  async uploadImage(base64Data: string): Promise<string> {


    const bucket = this.firebaseApp.storage().bucket();
    const buffer = Buffer.from(base64Data, "base64");
    const fileName = `${''}_${Date.now()}.png`;
    const file = bucket.file(fileName);
    await file.save(buffer);
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "01-01-2100",
    });
    return url;
  }
}
