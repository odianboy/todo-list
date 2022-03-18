import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { Task } from '../shared/interfaces';
import { TasksService } from '../shared/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskListComponent {
  
  @Input() task!: Task;

  @Output() onDeleted = new EventEmitter<number>();
  @Output() onCompleted = new EventEmitter<number>();

  constructor() {}

  deleteTask(id: number): void {
    this.onDeleted.emit(id);
  }

  complatedTask(id: number): void {
    this.onCompleted.emit(id);
  }
}
