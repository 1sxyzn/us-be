import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { UserInfo } from './UserInfo';

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

  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // DB 연동 후 signupVerifyToken 으로 회원 가입 처리 중인 유저 여부 조회한 다음, 없으면 에러
    // 있다면 로그인 상태로 바꾸기 위해 jwt 발급
    throw new Error('Method 404');
  }

  async login(email: string, password: string): Promise<string> {
    // DB 연동 후 email, password 를 가진 유저 조회, 없으면 에러
    // 있다면 jwt 발급
    throw new Error('Method 404');
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    // DB 연동 후 userId 를 가진 유저 조회, 없으면 에러
    // 있다면 데이터를 UserInfo 타입으로 반환
    throw new Error('Method 404');
  }
}
