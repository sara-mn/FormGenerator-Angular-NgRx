import {Component} from '@angular/core';
import menuItems from '../menuConfig.json';
import {environment} from '../environments/environment';
import {AuthGuard} from "./services/guard/auth.guard";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AppState} from "../types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isStaging: boolean = environment.staging;
  title = 'my-app';
  events: string[] = [];
  opened: boolean = true;
  menuItems: Menu[];
  user$: Observable<any>

  constructor(private auth: AuthGuard,
              private store: Store<AppState>,
              private router: Router) {
    this.checkUser();

    this.menuItems = (menuItems as Menu[])
      .map(e => {
        return {
          ...e,
          path: this.isStaging ? e.githubPath : e.path
        }
      })
  }

  checkUser() {
    // this.user$ = this.store.select('user')
    // this.user$.subscribe((user) => {
    //   if (this.isEmptyObject(user))
    //     from(this.router.navigate(['/login'])).subscribe();
    // })
  }

  isEmptyObject(obj: object) {
    return (obj && (Object.keys(obj).length === 0));
  }

  showInfo() {
    console.log("menu clicked")
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
