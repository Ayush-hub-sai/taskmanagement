import { Component } from '@angular/core';
import { Task } from '../../enum/task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageTaskService } from '../../services/manage-task.service';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css'
})
export class TasklistComponent {
  tasks: Task[] = []
  statusOptions = ['Active', 'Completed'];

  constructor(private taskService: ManageTaskService, private router: Router) {
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const storedTasksString = localStorage.getItem('tasks');
    if (storedTasksString !== null) {
      const storedTasks: any[] = JSON.parse(storedTasksString);
      this.tasks = storedTasks
    } else {
    }
  }

  navigateToAddTask() {
    this.router.navigate(['addedit'])
  }

  deleteTask(index: number): void {
    this.taskService.deleteTask(index);
    this.loadTasks()
  }

  viewTask(task: any) {
    localStorage.setItem("taskDetails", JSON.stringify(task))
    this.router.navigate(['taskdetails'])
  }

  toggleStatus(task: Task): void {
    task.status = task.status === 'Active' ? 'Inactive' : 'Active';
    this.taskService.updateTaskStatus(task);
    this.loadTasks()
  }

  updateTask(task: Task) {
    localStorage.setItem("editTask", JSON.stringify(task))
    this.router.navigate(['addedit'])
  }

}
