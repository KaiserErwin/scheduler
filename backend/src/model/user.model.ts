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
import Attend from './attend.model';

import { Session } from './session.model';

@Table({
  modelName: 'user',
  scopes: {
    data: {
      attributes: {
        exclude: ['password', 'verifyEmailToken'],
      },
    },
  },
  paranoid: true,
})
export class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column
  public userId: number;

  @Unique
  @Column
  public email: string;

  @Column
  public firstName: string;

  @Column
  public lastName: string;

  @Column
  public password: string;

  @Column
  public emailIsVerified: boolean;

  @Column
  public verifyEmailToken: string;

  @Column
  public deletedAt: Date;

  @HasMany(() => Session, 'user_id')
  public sessions: Session[];

  @HasMany(() => Attend, 'user_id')
  public attend: Attend[];
}

export default User;
