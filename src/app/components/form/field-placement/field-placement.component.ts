import {
  CdkDrag, CdkDragDrop,
  CdkDragEnd, CdkDragEnter, CdkDragExit, CdkDragMove, CdkDragStart, CdkDropList, CdkDropListGroup, moveItemInArray
} from '@angular/cdk/drag-drop';
import {ViewportRuler} from '@angular/cdk/overlay';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Field, Form} from "../form-types";

@Component({
  selector: 'app-field-placement',
  templateUrl: './field-placement.component.html',
  styleUrls: ['./field-placement.component.scss']
})
export class FieldPlacementComponent implements OnInit {
  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @Input() form: Form;

  dropzone: number | null;
  draggedItem: Field | null;
  dropped: boolean = false;

  constructor(private viewportRuler: ViewportRuler) {
  }

  ngOnInit(): void {}

  swapList(list: Field[], from: number, to: number) {
    const min = from < to ? from : to,
      max = from < to ? to : from;
    let arr,
      arrLeft,
      arrRight;

    arrLeft = list.slice(0, min);
    arrRight = list.slice(max + 1);

    arr = list.slice(min, max);
    arr.push(list[max]);

    if (from < to) {
      arr.push(arr.shift() as Field);
    } else {
      arr.unshift(arr.pop() as Field);
    }

    list = [...arrLeft, ...arr, ...arrRight];
    list.forEach((f, index) => f.index = index);
    this.form.fields = list;
  }

  dragStart(event: CdkDragStart<Field>) {
    if (event.source.data._dragged) {
      event.event.preventDefault();
      return;
    }

    event.source.data._dragged = true;
    this.draggedItem = event.source.data;
  }

  dragEnd(event: CdkDragEnd<Field>) {
    if (!this.dropped) {
      delete event.source.data._dragged;
      this.draggedItem = null;
    }
  }

  dragEnter(event: CdkDragEnter) {
    if (this.draggedItem) {
      if (this.draggedItem.index === event.container.data.index) return;
      this.swapList(this.form.fields || [], this.draggedItem.index, event.container.data.index);
    }
  }

  drop(event: CdkDragDrop<Field>) {
    this.dropped = true;
    if (!this.draggedItem) return;
    event.event.preventDefault();
    this.swapList(this.form.fields || [], this.draggedItem.index, event.item.data.index);
    this.resetDraggedItem();
  }

  resetDraggedItem() {
    if (!this.draggedItem) return;
    delete this.draggedItem._dragged;
    this.draggedItem = null;
  }
}

function __indexOf(collection: any, node: any) {
  return Array.prototype.indexOf.call(collection, node);
};

/** Determines whether an event is a touch event. */
function __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  return event.type.startsWith('touch');
}

function __isInsideDropListClientRect(dropList: CdkDropList, x: number, y: number) {
  const {top, bottom, left, right} = dropList.element.nativeElement.getBoundingClientRect();
  return y >= top && y <= bottom && x >= left && x <= right;
}
