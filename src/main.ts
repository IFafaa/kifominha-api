import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as dotenv from "dotenv";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { initializeFirebase } from "firebaseConfig";

dotenv.config();
initializeFirebase();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
    .setTitle("KIFOMINHA APP")
    .setDescription("")
    .setVersion("1.0")
    .addServer("http://localhost:3000/", "Local environment")
    .addTag("KIFOMINHA APP")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api-docs", app, document);
  app.enableCors({ origin: "*" });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
