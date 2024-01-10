import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../enum/task';

@Injectable({
  providedIn: 'root'
})
export class ManageTaskService {
  private tasks: Task[] = [];
  lastElementId: number = 0;

  constructor() {
    this.loadTasksFromLocalStorage();
  }

  saveTasks(item: Task): void {
    this.lastElementId++;
    item.id = this.lastElementId;
    this.tasks.push(item);
    this.updateLocalStorageAndNotify();
  }

  deleteTask(index: number): void {
    if (index >= 0 && index < this.tasks.length) {
      this.tasks.splice(index, 1);
      this.updateLocalStorageAndNotify();
    }
  }

  updateLocalStorageAndNotify(): void {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  private loadTasksFromLocalStorage(): void {
    const storedTasksString = localStorage.getItem('tasks');

    if (storedTasksString !== null) {
      this.tasks = JSON.parse(storedTasksString);
      const lastIndex = this.tasks.length - 1;
      const lastElement = this.tasks[lastIndex];
      this.lastElementId = lastElement ? lastElement.id : 0;
    }
  }

  updateTaskStatus(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.updateLocalStorageAndNotify();
    }
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) {
      this.tasks[index] = task;
      this.updateLocalStorageAndNotify();
    }
  }

}
