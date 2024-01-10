import { Routes } from '@angular/router';
import { TasklistComponent } from './pages/tasklist/tasklist.component';
import { TaskdetailsComponent } from './pages/taskdetails/taskdetails.component';
import { AddEditTaskComponent } from './pages/add-edit-task/add-edit-task.component';

export const routes: Routes = [{ path: '', redirectTo: 'tasklist', pathMatch: 'full' },
{ path: 'tasklist', component: TasklistComponent },
{ path: 'taskdetails', component: TaskdetailsComponent },
{ path: 'addedit', component: AddEditTaskComponent }];

