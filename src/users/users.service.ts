import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}
  async createUser(name: string, email: string, password: string) {
    await this.checkUserExists(email); // 유저 존재 여부 검사. 이미 가입된 유저면 에러 발생

    const signupVerifyToken = uuid.v1(); // 시간과 mac 주소를 기반으로 uuid 생성.. v4 사용 지향한다고 함..

    await this.saveUser(name, email, password, signupVerifyToken); // db에 유저 저장. 아직 db 연동 x
    await this.sendMemberJoinEmail(email, signupVerifyToken); // 회원가입 인증 이메일 발송
  }

  private checkUserExists(email: string) {
    return false;
  }

  private saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    return; // db 연동 후 구현 예정
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }
}
