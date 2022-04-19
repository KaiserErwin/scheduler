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

import Admin from './admin.model';
import User from './user.model';

@Table({
  modelName: 'session',
  paranoid: true,
})
export class Session extends Model {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column
  public sessionId: number;

  @AllowNull(false)
  @Column
  public token: string;

  @ForeignKey(() => Admin)
  @Column
  public adminId: number;
  @BelongsTo(() => Admin, 'admin_id')
  public admin: Admin;

  @ForeignKey(() => User)
  @Column
  public userId: number;
  @BelongsTo(() => User, 'user_id')
  public user: User;

  @Column
  public deletedAt: Date;
}

export default Session;
