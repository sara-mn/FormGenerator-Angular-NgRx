import {Component, OnInit} from '@angular/core';
import * as menuItems from '../menuConfig.json';
import {environment} from '../environments/environment';
import {AuthGuard} from "./services/guard/auth.guard";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "./store/models/user";
import {AppState} from "./store/app.state";
import {userSelector} from "./store/selectors/user.selectors";
import {UserActions} from "./store/actions/user.action";
import {StorageService} from "./services/storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isStaging: boolean = environment.staging;
  title = 'my-app';
  events: string[] = [];
  opened: boolean = true;
  menuItems: Menu[];
  user$: Observable<User>

  constructor(private auth: AuthGuard,
              private store: Store<AppState>,
              private storageService: StorageService) {
    this.user$ = this.store.pipe(select(userSelector));

    this.menuItems = (menuItems as Menu[])
      .map(e => {
        return {
          ...e,
          path: this.isStaging ? e.githubPath : e.path
        }
      })
  }

  ngOnInit() {
    const userId = this.storageService.getStorage('userId');
    if (userId)
      this.store.dispatch(UserActions.getUserById({userId: +userId}));
  }

  // isEmptyObject(obj: object) {
  //   return (obj && (Object.keys(obj).length === 0));
  // }
  //
  // showInfo() {
  //   console.log("menu clicked")
  // }
}

interface Menu {
  "id": number,
  "title": string,
  "display": string,
  "icon": string,
  "githubPath": string,
  "path": string
}
