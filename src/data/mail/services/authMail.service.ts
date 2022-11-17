import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "src/domain/model/interface/users.interface";
import { AuthMailRepository } from "src/domain/repository/authMail.repository";

@Injectable()
export class AuthMailService implements AuthMailRepository {
  constructor(private mailerService: MailerService) { }

  async sendMailToChangePassword(user: User): Promise<void> {
    let fullName = ((user.person.firstName ?? '') + ' ' + (user.person.lastName ?? '')).trim();

    if (!user.email) return;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Cambio de contraseña requerido!',
      template: './auth/changePassword', 
      context: {
        fullName: fullName,
        token: user.passwordChangeToken
      },
    });
  }

}