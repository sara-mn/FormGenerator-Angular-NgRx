import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {AuthReducer} from "./reducers/auth.reducer";
import {UserReducer} from "./reducers/user.reducer";
import {AuthEffects} from "./effects/auth.effect";
import { EffectsModule } from "@ngrx/effects";
import {environment} from "../../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import {UserEffects} from "./effects/user.effect";

// const reducers: ActionReducerMap<AppState, any> = {
//   auth: AuthReducer,
//   user: UserReducer
// };

@NgModule({
  imports: [
    StoreModule.forFeature('auth' , AuthReducer),
    StoreModule.forFeature('user' , UserReducer),
    EffectsModule.forFeature([AuthEffects]),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class NgrxModule {

}
