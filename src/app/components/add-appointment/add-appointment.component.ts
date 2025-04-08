import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { AppointmentAddDto } from '../../models/interfaces/appointment-add-dto';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

// Validator for date not in the past
function futureDateValidator(control: AbstractControl) {
  const selectedDate = new Date(control.value);
  const today = new Date();
  selectedDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  return selectedDate >= today ? null : { pastDate: true };
}

// Validator for ID card (numeric string ending with a letter)
function idCardValidator(control: AbstractControl) {
  const regex = /^[0-9]+[A-Za-z]$/;
  return regex.test(control.value) ? null : { invalidIdCard: true };
}

@Component({
  selector: 'app-add-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent {
  appointmentForm: FormGroup;

  animalTypes = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Reptile'];
  durations = [10, 15, 30];

  constructor(private fb: FormBuilder,
              private apptService: AppointmentService,
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
      reasonForAppointment: ['', Validators.required]
      // Note: vetNotes is omitted when adding an appointment.
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointment: AppointmentAddDto = this.appointmentForm.value;
      this.apptService.addAppointment(appointment).subscribe({
        next: () => {
          Swal.fire('Success', 'Appointment added successfully!', 'success');
          this.router.navigate(['/appointments']);
        },
        error: err => {
          Swal.fire('Error', 'Could not add appointment', 'error');
        }
      });
    }
  }
}
