export interface AppointmentAddDto {
    animalType: string;
    appointmentDate: string;   
    appointmentTime: string;    
    appointmentDuration: number;  
    ownerContactNumber: string;
    ownerIdCardNumber: string;
    ownerName: string;
    ownerSurname: string;
    patientName: string;
    reasonForAppointment: string;
    vetNotes?: string;
}
