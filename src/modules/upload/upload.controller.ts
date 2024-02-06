import { ApiTags } from "@nestjs/swagger";
import { UploadService } from "./upload.service";
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@ApiTags("Uploads")
@Controller("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("image")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFoodImage(@UploadedFile() file) {
    return await this.uploadService.uploadImage(file);
  }
}
