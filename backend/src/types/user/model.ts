import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDTO {
  @Expose()
  readonly userId: number;

  @Expose()
  readonly email: string;

  @Expose()
  readonly firstName: string;

  @Expose()
  readonly lastName: string;

  @Expose()
  readonly emailIsVerified: boolean;

  @Expose()
  readonly verifyEmailToken: string;

  @Expose()
  readonly deletedAt: Date;
}
