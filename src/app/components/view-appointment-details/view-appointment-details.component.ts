import { Component } from '@angular/core';
import { AppointmentDto } from '../../models/interfaces/appointment-dto';
import { AppointmentService } from '../../services/appointment.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-appointment-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-appointment-details.component.html',
  styleUrl: './view-appointment-details.component.css'
})
export class ViewAppointmentDetailsComponent {
  appointment!: AppointmentDto;

  constructor(private apptService: AppointmentService, private route: ActivatedRoute) {}

  ngOnInit() {
    const appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.apptService.getAppointment(appointmentId).subscribe({
      next: (appt: AppointmentDto) => {
        this.appointment = appt;
      },
      error: err => {
        Swal.fire('Error', 'Could not retrieve appointment details', 'error');
      }
    });
  }
}
