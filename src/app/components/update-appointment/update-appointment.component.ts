import { Component } from '@angular/core';
import { AppointmentAddDto } from '../../models/interfaces/appointment-add-dto';
import Swal from 'sweetalert2';
import { AppointmentDto } from '../../models/interfaces/appointment-dto';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';


function futureDateValidator(control: AbstractControl) {
  const selectedDate = new Date(control.value);
  const today = new Date();
  selectedDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  return selectedDate >= today ? null : { pastDate: true };
}
function idCardValidator(control: AbstractControl) {
  const regex = /^[0-9]+[A-Za-z]$/;
  return regex.test(control.value) ? null : { invalidIdCard: true };
}


@Component({
  selector: 'app-update-appointment',
  standalone: true,
  imports: [],
  templateUrl: './update-appointment.component.html',
  styleUrl: './update-appointment.component.css'
})
export class UpdateAppointmentComponent {
  appointmentForm: FormGroup;
  appointmentId!: number;

  animalTypes = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Reptile'];
  durations = [10, 15, 30];

  constructor(private fb: FormBuilder,
              private apptService: AppointmentService,
              private route: ActivatedRoute,
              private router: Router) {
    this.appointmentForm = this.fb.group({
      patientName: ['', Validators.required],
      animalType: ['', Validators.required],
      ownerIdCardNumber: ['', [Validators.required, idCardValidator]],
      ownerName: ['', Validators.required],
      ownerSurname: ['', Validators.required],
      ownerContactNumber: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[0-9]*$")]],
      appointmentDate: ['', [Validators.required, futureDateValidator]],
      appointmentTime: ['', Validators.required],
      appointmentDuration: ['', Validators.required],
      reasonForAppointment: ['', Validators.required],
      vetNotes: ['']
    });
  }

  ngOnInit() {
    this.appointmentId = Number(this.route.snapshot.paramMap.get('id'));
    this.apptService.getAppointment(this.appointmentId).subscribe({
      next: (appt: AppointmentDto) => {
        this.appointmentForm.patchValue({
          patientName: appt.patientName,
          animalType: appt.animalType,
          ownerIdCardNumber: appt.ownerIdCardNumber,
          ownerName: appt.ownerName,
          ownerSurname: appt.ownerSurname,
          ownerContactNumber: appt.ownerContactNumber,
          appointmentDate: appt.appointmentDate,
          appointmentTime: appt.appointmentTime,
          appointmentDuration: appt.appointmentDuration,
          reasonForAppointment: appt.reasonForAppointment,
          vetNotes: appt.vetNotes
        });
      },
      error: err => {
        Swal.fire('Error', 'Could not load appointment data', 'error');
      }
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const updatedAppointment: AppointmentAddDto = this.appointmentForm.value;
      this.apptService.updateAppointment(this.appointmentId, updatedAppointment).subscribe({
        next: () => {
          Swal.fire('Success', 'Appointment updated successfully!', 'success');
          this.router.navigate(['/appointments']);
        },
        error: err => {
          Swal.fire('Error', 'Could not update appointment', 'error');
        }
      });
    }
  }
}
