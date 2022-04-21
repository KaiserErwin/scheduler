import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AttendDTO {
  @Expose()
  readonly attendId: number;

  @Expose()
  readonly eventId: number;

  @Expose()
  readonly userId: number;

  @Expose()
  readonly deletedAt: Date;
}
