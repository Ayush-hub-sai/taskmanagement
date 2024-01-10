import { Component, OnInit } from '@angular/core';
import { Task } from '../../enum/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-taskdetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './taskdetails.component.html',
  styleUrl: './taskdetails.component.css'
})
export class TaskdetailsComponent implements OnInit {
  tasks!: Task

  ngOnInit(): void {
    const storedTasksString = localStorage.getItem('taskDetails');
    if (storedTasksString !== null) {
      this.tasks = JSON.parse(storedTasksString);
    }
  }
}
