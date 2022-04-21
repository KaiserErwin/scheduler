import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

import { EventStatus } from '../enums/event_status.enum';
import Admin from './admin.model';

@Table({
  modelName: 'event',
  paranoid: true,
})
export class Event extends Model<Event> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column
  public eventId: number;

  @Column
  public eventDate: Date;

  @Column
  public status: EventStatus

  @Column
  public address: string;

  @Column
  public deletedAt: Date;

  @ForeignKey(() => Admin)
  @Column
  public adminId: number;
  @BelongsTo(() => Admin, 'admin_id')
  public admin: Admin;
}

export default Event;
