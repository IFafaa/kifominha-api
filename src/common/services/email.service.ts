import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import * as smtpTransport from "nodemailer-smtp-transport";

@Injectable()
export class EmailService {
  private readonly transporter;

  constructor() {
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false,
        auth: {
          user: "fabriciotrab2005@gmail.com",
          pass: "r73QCFk6wBOs4Vgn",
        },
      }),
    );
  }

  async sendEmail(
    destiny: string,
    subject: string,
    body: string,
  ): Promise<void> {
    const emailOptions = {
      from: "kifominha@gmail.com",
      to: destiny,
      subject: subject,
      text: body,
    };

    return await this.transporter.sendMail(emailOptions);
  }
}
