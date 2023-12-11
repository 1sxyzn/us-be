import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
  // 메일 옵션 타입
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // nodemailer에서 제공하는 transporter 객체 생성
      service: 'Gmail',
      auth: {
        user: 'test@mail.com',
        pass: 'aaaa bbbb cccc dddd',
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signVerifyToken: string,
  ) {
    const baseUrl = 'http://localhost:3000';

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        버튼을 누르시면 인증이 완료됩니다. <br/>
        <form action="${url}" method="POST">
          <button> 확인 </button>
        </form>
      `,
    };

    return await this.transporter.sendMail(mailOptions); // transporter 객체를 통해 메일 전송
  }
}
