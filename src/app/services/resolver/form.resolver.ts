import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, take } from 'rxjs';
import {Form} from "../../components/form/form-types";
import {FormService} from "../../dbManaging/form.service";

@Injectable({
  providedIn: 'root'
})
export class FormResolver implements Resolve<Form> {
  constructor(private formService: FormService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Form> {
    const id = route.params['id'];
      return this.formService.getById({params: {id}})
        .pipe(take(1))
  }
}
