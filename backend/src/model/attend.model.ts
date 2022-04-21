import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Event  from './event.model';
import User from './user.model';

@Table({
  modelName: 'attend',
  paranoid: true,
})
export class Attend extends Model<Attend> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column
  public attendId: number;

  @Column
  public deletedAt: Date;

  @ForeignKey(() => Event)
  @Column
  public eventId: number;
  @BelongsTo(() => Event, 'event_id')
  public event: Event;

  @ForeignKey(() => User)
  @Column
  public userId: number;
  @BelongsTo(() => User, 'user_id')
  public user: User;

}

export default Attend
