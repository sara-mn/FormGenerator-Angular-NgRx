import {Component, OnInit} from '@angular/core';
import * as mIs from '../menuConfig.json';
import {environment} from '../environments/environment';
import {AuthGuard} from "./services/guard/auth.guard";
import {select, Store} from "@ngrx/store";
import {empty, Observable, SchedulerLike} from "rxjs";
import {Router} from "@angular/router";
import {User} from "./store/models/user";
import {AppState} from "./store/app.state";
import {userSelector} from "./store/selectors/user.selectors";
import {UserActions} from "./store/actions/user.action";
import {StorageService} from "./services/storage.service";
import {AuthActions} from "./store/actions/auth.action";

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
  _menuItems = mIs;
  menuItems: Menu[];
  user$: Observable<User| undefined>;

  constructor(private auth: AuthGuard,
              private store: Store<AppState>,
              private storageService: StorageService) {
    this.user$ = this.store.pipe(select(userSelector));

    this.menuItems = this._menuItems.items
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

  logout(){
    this.store.dispatch(AuthActions.logout());
  }
}

interface Menu {
  "id": number,
  "title": string,
  "display": string,
  "icon": string,
  "githubPath": string,
  "path": string
}
