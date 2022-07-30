import {Injectable} from '@angular/core';
import {User} from '../../types';
import {db} from "../../db";
import {DBRequest, KeyValue} from "./types";
import {IndexableType} from "dexie";
import {from, map, Observable, combineLatest} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  static async getAll(req: DBRequest) {
    const users = await db.users.toArray();

    return users || [];
  }

  static async getByToken(req: DBRequest): Promise<User> {
    // let users = JSON.parse(localStorage.getItem('users') || '[]');
    // const user = users.filter((e: KeyValue) => e.token === req.params.token);

    const user = await db.users.get((e: KeyValue) => e['token'] === req.params['token']);
    console.log(await this.getAll(req));

    if (user)
      return user;
    else
      throw 'user not found'
  }

  static async getById(req: DBRequest) {
    const user = await db.users.get((e: KeyValue) => e['id'] === req.params['id']);
    console.log(await this.getAll(req));

    if (user)
      return user;
    else
      throw 'user not found'
  }

  getByEmailAndPassword(req: DBRequest): Observable<User> {
    // let users = JSON.parse(localStorage.getItem('users') || '[]');
    // const user = users.filter((e: KeyValue) => e.email === req.params.email && e.password === req.params.password);
    return from(db.users.where({email: req.params['username'], password: req.params['password']}).first())
      .pipe(map(user => {
        if (typeof user === 'undefined') {
          throw 'username or password is wrong!';
        }
        return user;
      }));
  }

  create(user: User): Observable<IndexableType> {
    const foundUser$ = from(db.users.where({email: user.email}).first())
      .pipe(map(user => {
        if (typeof user !== 'undefined') {
          throw 'email is exist!';
        }
        return true;
      }));

    const cmd: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      token: user.token,
      rememberMe: user.rememberMe,
      agreementWithRights: user.agreementWithRights
    }
    const saveUser$ = from(db.users.add(cmd));

    try {
      // let users = JSON.parse(localStorage.getItem('users') ?? '[]');
      // users.push(cmd);
      // localStorage.setItem('users', JSON.stringify(users));

      return combineLatest([foundUser$, saveUser$], (user, saveResult) => {
        return saveResult;
      })
    } catch (error) {
      throw error;
    }
  }

  static async update(id: string, user: User): Promise<void> {
    const cmd: User = {
      name: user.name,
      email: user.email,
      password: user.password,
      token: user.token,
      rememberMe: user.rememberMe,
      agreementWithRights: user.agreementWithRights
    }
    try {
      await db.users.update(id, cmd); // 0 or 1 return
    } catch (error) {
      throw error;
    }
  }
}
