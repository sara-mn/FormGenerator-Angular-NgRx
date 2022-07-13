import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {formReducer} from "./form.state";

@NgModule({
  imports:[
    StoreModule.forRoot({
     // forms: formReducer
    })
  ]
})
export class NgrxModule{

}
