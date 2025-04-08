import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AppointmentDto } from '../../models/interfaces/appointment-dto';
import { AppointmentService } from '../../services/appointment.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppointmentStatusPipe } from "../../pipes/appointment-status.pipe";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule, AppointmentStatusPipe],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {
  appointments: AppointmentDto[] = [];
  
  constructor(
    private apptService: AppointmentService,
    public authService: AuthService,
    private router: Router) {}

  ngOnInit() {
    this.loadAppointments();
  }

  loadAppointments() {
    this.apptService.getAppointments().subscribe({
      next: data => this.appointments = data,
      error: err => console.error(err)
    });
  }

  viewAppointment(id: number) {
    this.router.navigate(['/appointment/view', id]);
  }

  updateAppointment(id: number) {
    this.router.navigate(['/appointment/update', id]);
  }

  deleteAppointment(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this appointment?',
      icon: 'warning',
      showCancelButton: true
    }).then(result => {
      if (result.isConfirmed) {
        this.apptService.deleteAppointment(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The appointment has been deleted.', 'success');
            this.loadAppointments();
          },
          error: err => Swal.fire('Error', 'Could not delete the appointment.', 'error')
        });
      }
    });
  }
}
