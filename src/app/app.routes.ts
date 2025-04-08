import { Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { RoleGuard } from './Guards/role.guard';
import { AddAppointmentComponent } from './components/add-appointment/add-appointment.component';
import { LoginComponent } from './components/login/login.component';
import { UpdateAppointmentComponent } from './components/update-appointment/update-appointment.component';
import { ViewAppointmentDetailsComponent } from './components/view-appointment-details/view-appointment-details.component';

export const routes: Routes = [
    { path: '', redirectTo: '/appointments', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'appointments', component: AppointmentListComponent, canActivate: [AuthGuard] },
    { path: 'appointment/add', component: AddAppointmentComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'RECEPTIONIST'] } },
    { path: 'appointment/update/:id', component: UpdateAppointmentComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'RECEPTIONIST', 'VET'] } },
    { path: 'appointment/view/:id', component: ViewAppointmentDetailsComponent, canActivate: [AuthGuard] },
    { path: 'unauthorized', component: LoginComponent }
];
