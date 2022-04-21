import {
  AllowNull,
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Event } from './event.model';

import { Session } from './session.model';

@Table({
  modelName: 'admin',
  scopes: {
    data: {
      attributes: {
        exclude: ['password', 'verifyEmailToken'],
      },
    },
  },
  paranoid: true,
})
export class Admin extends Model<Admin> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column
  public adminId: number;

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

  @HasMany(() => Session, 'admin_id')
  public sessions: Session[];

  @HasMany(() => Event, 'admin_id')
  public events: Event[];
}

export default Admin;
