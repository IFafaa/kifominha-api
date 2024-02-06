import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { FirebaseService } from "src/common/services/firebase.service";

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService, FirebaseService],
  exports: [UploadService],
})
export class UploadModule {}
