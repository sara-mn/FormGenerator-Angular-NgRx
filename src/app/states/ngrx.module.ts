import {NgModule} from "@angular/core";
import {ActionReducerMap, StoreModule} from "@ngrx/store";
import {UserReducer as userReducer} from "./user.state";
import {AppState, User} from "../../types";

const reducers: ActionReducerMap<AppState, any> = {
  user: userReducer
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers)
  ]
})
export class NgrxModule {

}
