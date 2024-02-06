import { Injectable } from "@nestjs/common";
import { FirebaseService } from "../../common/services/firebase.service";

@Injectable()
export class UploadService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async uploadImage(file): Promise<string> {
    console.log("file depois", file);

    const storage = this.firebaseService.getStorageInstance();
    const bucket = storage.bucket();

    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);
    await fileUpload.save(file.buffer);
    const [url] = await fileUpload.getSignedUrl({
      action: "read",
      expires: "01-01-2100",
    });
    return url;
  }
}
