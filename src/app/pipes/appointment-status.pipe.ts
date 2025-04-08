import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appointmentStatus',
  standalone: true
})
export class AppointmentStatusPipe implements PipeTransform {

  transform(appointmentDate: string, appointmentTime: string): string {
    const now = new Date();
    const appt = new Date(`${appointmentDate}T${appointmentTime}`);
    return appt >= now ? 'Upcoming' : 'Past';
  }

}
