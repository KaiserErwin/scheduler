import { Exclude, Expose } from 'class-transformer';
import { EventStatus } from '../../enums/event_status.enum';

@Exclude()
export class EventDTO {
  @Expose()
  readonly eventId: number;

  @Expose()
  readonly eventDate: Date

  @Expose()
  readonly status: EventStatus

  @Expose()
  readonly address: string

  @Expose()
  readonly deletedAt: Date;
}
