import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManageTaskService } from '../../services/manage-task.service';

@Component({
  selector: 'app-add-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-edit-task.component.html',
  styleUrl: './add-edit-task.component.css'
})
export class AddEditTaskComponent implements OnDestroy {
  taskForm!: FormGroup;
  statusOptions = ['Active', 'Completed'];
  task: any[] = []
  lastElementId: number = 0;
  editTask: any;
  constructor(private formBuilder: FormBuilder, private _taskService: ManageTaskService) { }


  ngOnInit(): void {
    this.loadForm()
    const storedTasksString = localStorage.getItem('editTask');
    if (storedTasksString !== null) {
      this.editTask = JSON.parse(storedTasksString);
      this.setData()
    }
  }

  setData() {
    this.taskForm.setValue({
      id: this.editTask.id,
      title: this.editTask.title,
      description: this.editTask.description,
      dueDate: this.editTask.dueDate,
      status: this.editTask.status
    })
  }

  loadForm() {
    this.taskForm = this.formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      description: [''],
      dueDate: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      if (this.editTask == null || this.editTask == undefined) {
        this._taskService.saveTasks(this.taskForm.value);
        this.taskForm.reset()
      } else {
        this._taskService.updateTask(this.taskForm.value)
      }
      history.back()
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('editTask')
  }

}
