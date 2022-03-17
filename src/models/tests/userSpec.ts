import database from '../../database';
import { User, UserClass } from '../user';
import bcrypt, { hash } from 'bcrypt';

const pepper: string | undefined = process.env.BCRYPT_PASSWORD;
const saltRounds: string | undefined = process.env.SALT_ROUNDS;

const userClass = new UserClass();
describe('User Model', () => {
  it('Should have an Index method', () => {
    expect(userClass.index).toBeDefined();
  });
  it('Should have an Create method', () => {
    expect(userClass.create).toBeDefined();
  });
  it('Should have an Show method', () => {
    expect(userClass.show).toBeDefined();
  });
  it('Should have an Delete method', () => {
    expect(userClass.delete).toBeDefined();
  });
  it('Should have an Update method', () => {
    expect(userClass.update).toBeDefined();
  });
});

describe('User Model Functions', () => {
  afterAll(async () => {
    const conn = await database.connect();
    const sql = 'DELETE FROM users;';
    await conn.query(sql);
    const sql2 = 'ALTER SEQUENCE users_id_seq RESTART WITH 1;';
    await conn.query(sql2);
    conn.release();
  });

  it('Create Method -> Add User', async () => {
    const hash = bcrypt.hashSync(
      '123' + pepper,
      parseInt(saltRounds as string)
    );
    const newUser = await userClass.create({
      firstName: 'mustafa',
      lastName: 'kamal',
      password: hash
    });
    expect(newUser.id).toEqual(1 as unknown as string);
    expect(newUser.firstName).toEqual('mustafa');
    expect(newUser.lastName).toEqual('kamal');
    expect(bcrypt.compare('123', newUser.password)).toBeTruthy();
  });
  it('Index Method -> Retrive All Users ', async () => {
    const newUser = await userClass.index();
    expect(newUser[0].id).toEqual(1 as unknown as string);
    expect(newUser[0].firstName).toEqual('mustafa');
    expect(newUser[0].lastName).toEqual('kamal');
    expect(bcrypt.compare('123', newUser[0].password)).toBeTruthy();
  });
  it('Show Method -> Retrive a User With Spacifec ID', async () => {
    const newUser = await userClass.show('1');
    expect(newUser[0].id).toEqual(1 as unknown as string);
    expect(newUser[0].firstName).toEqual('mustafa');
    expect(newUser[0].lastName).toEqual('kamal');
    expect(bcrypt.compare('123', newUser[0].password)).toBeTruthy();
  });
  it('Delete Method -> Delete User With Spacifec ID ', async () => {
    const result = await userClass.delete('2');
    expect(result).toEqual('user deleted successfully! 👍');
  });
  it('Update Method -> Update User With Spacifec ID', async () => {
    const hash = bcrypt.hashSync(
      '567' + pepper,
      parseInt(saltRounds as string)
    );
    const result = await userClass.update(
      {
        firstName: 'first-test',
        lastName: 'last-test',
        password: hash
      },
      '1'
    );
    expect(result).toEqual('user updated successfully! 👍');
  });
});
