import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true, type: 'varchar' })
  role: string | null;

  constructor(username: string, password: string, role?: string) {
    this.username = username;
    this.password = password;
    this.role = role || null;
  }
}

export type UserWithoutPassword = Omit<User, 'password'>;
