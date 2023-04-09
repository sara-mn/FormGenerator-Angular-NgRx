import {Component, OnInit} from '@angular/core';
import * as mIs from '../menuConfig.json';
import {environment} from '../environments/environment';
import {AuthGuard} from "./services/guard/auth.guard";
import {select, Store} from "@ngrx/store";
import {map, Observable, tap} from "rxjs";
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
  user$: Observable<User | undefined>;
  userId: string | null;

  constructor(private auth: AuthGuard,
              private store: Store<AppState>,
              private storageService: StorageService) {
    this.user$ = this.store.pipe(select(userSelector));
    this.userId = this.storageService.getStorage('userId');
    this.menuItems = this._menuItems.items
      .map(e => {
        return {
          ...e,
          path: this.isStaging ? e.githubPath : e.path
        }
      })
  }

  ngOnInit() {
    if (this.userId)
      this.store.dispatch(UserActions.getUserById({userId: +this.userId}));
  }

  ngAfterViewInit() {
    // if (this.userId)
    //   this.user$.pipe(
    //     tap((user: User | undefined) => {
    //       if (user === undefined) this.logout()
    //     })
    //   ).subscribe()
  }

  logout() {
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
