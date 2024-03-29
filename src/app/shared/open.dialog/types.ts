import { MatDialogConfig } from "@angular/material/dialog";
import {ComponentType} from "../grid/grid-types";

export interface Dialog<T,D = {}> {
  component: ComponentType<T>,
  config?: MatDialogConfig,
  data?: D
}
