import { Injectable } from '@angular/core';
import { of, tap, Observable, BehaviorSubject } from 'rxjs';
import { Task } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$: Observable<Task[]>;
  private _tasks$: BehaviorSubject<Task[]>;

  constructor() {
    this._tasks$ = new BehaviorSubject(this.getTasks());
    this.tasks$ = this._tasks$.asObservable();
  }

  getTasks(): Task[] {
    return JSON.parse(localStorage.getItem('todos') as string) ?? [] as Task[];
  }

  genId(): number {
    return Math.round(Math.random() * 10000000);
  }


  addTask(task: Task):void {
    const tasks = this._tasks$.getValue();
    tasks.unshift(task);
    this._tasks$.next(tasks);
  }

  deleteTask(id: number) {
    let tasks = this._tasks$.getValue();
    tasks = tasks.filter(item => item.id != id);
    this._tasks$.next(tasks);
  }

  executeTask(id: number) {
    const tasks = this._tasks$.getValue();
    const idx = tasks.findIndex(item => item.id === id);
    tasks[idx].completed = !tasks[idx].completed;
    this._tasks$.next(tasks);
  }

  setTodosToLocalStorage() {
    const todos = JSON.stringify(this._tasks$.getValue());
    localStorage.setItem('todos', todos);
  }
}
