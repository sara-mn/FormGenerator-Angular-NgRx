import {Injectable} from '@angular/core';
import {db} from "../../db";
import {DBRequest, KeyValue} from "./types";
import {IndexableType} from "dexie";
import {from, map, Observable, combineLatest, filter, AsyncSubject} from "rxjs";
import {User} from "../store/models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject$ = new AsyncSubject<User>();
  constructor() {
  }

  getById(id: number): Observable<User> {
    return from(db.users.where({id: id}).first())
      .pipe( //filter(user => typeof user !== 'undefined')
          map(user => {
          if (typeof user === 'undefined') {
            throw 'username not found !';
          }
          return user;
        })
      );
  }

  getByEmailAndPassword(req: DBRequest): Observable<User> {
    // let users = JSON.parse(localStorage.getItem('users') || '[]');
    // const user = users.filter((e: KeyValue) => e.email === req.params.email && e.password === req.params.password);
    return from(db.users.where({username: req.params['username'], password: req.params['password']}).first())
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
      username: user.username,
      email: user.email,
      password: user.password
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

  async update(id: string, user: User): Promise<void> {
    const cmd: User = {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password
    }
    try {
      await db.users.update(id, cmd); // 0 or 1 return
    } catch (error) {
      throw error;
    }
  }
}
