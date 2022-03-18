import { HostListener, Component} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Task } from './shared/interfaces'; 
import { TasksService } from './shared/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list';
  tasks$: Observable<Task[]>;

  inputControl: FormControl;

  constructor(public taskService: TasksService) {
    this.inputControl = new FormControl(null, Validators.required);
    this.tasks$ = taskService.tasks$;
  }

  @HostListener('window:beforeunload')
  refreshLocalStorage() {
    this.taskService.setTodosToLocalStorage();
  }

  submit() {
    if (this.inputControl.invalid) {
      return
    }

    const task: Task = {
      id: this.taskService.genId(),
      title: this.inputControl.value,
      completed: false,
    }

    this.taskService.addTask(task)
    this.inputControl.reset();
  }

  delTaskLocalStorage(id: number): void {
    this.taskService.deleteTask(id);
  }

  comAddTaskLocalStorage(id: number): void {
    this.taskService.executeTask(id);
  }
}
