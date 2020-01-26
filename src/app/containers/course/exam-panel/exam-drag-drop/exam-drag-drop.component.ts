import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-exam-drag-drop',
  templateUrl: './exam-drag-drop.component.html',
  styleUrls: ['./exam-drag-drop.component.scss']
})
export class ExamDragDropComponent implements OnInit {
  diagramElement = [
    'start.PNG',
    'condition.PNG',
    'input_output.PNG',
    'process.PNG',
    'end.PNG',
    'condition_arrow.PNG',
    'condition_arrow_double.PNG',
    'input_output_arrow.PNG',
    'start_arrow.PNG'
  ];
  diagramScheme = [];
  setTrue: boolean;
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<number>) {
    return item.data % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
  constructor() {}

  ngOnInit() {}
}
