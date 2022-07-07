import {Component} from '@angular/core';
import menuItems from '../menuConfig.json';
import {environment} from '../environments/environment';

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
  menuItems : Menu[];

  constructor() {
    this.menuItems = (menuItems as Menu[])
      .map(e => {
        return {
          ...e,
          path : this.isStaging ? e.githubPath : e.path
        }
      })
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
