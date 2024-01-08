import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../service/patient.service';
import { DoctorService } from '../service/doctor.service';
import { HttpClientModule } from '@angular/common/http';
import { Patient } from '../model/patient';
import { Hospital } from '../model/hospital';
import { Doctor } from '../model/doctor';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [PatientService, DoctorService]
})
export class RegisterComponent implements OnInit{

  isDoctor: boolean = false;

  register! : FormGroup;

  public constructor(private router: Router,  private route: ActivatedRoute, private formbuilder: FormBuilder, private patientService: PatientService, private doctorService: DoctorService){

  }
  ngOnInit(): void {
    this.setDoctor();
    this.buildFormGroup();
  }
  buildFormGroup() {
    this.register = this.formbuilder.group({
      username:[],
      name:[],
      email: [],
      contactNumber: [],
      password:[],
      confirmPassword: []
    }),
    {
      validator: this.confirmedValidator('password', 'confirmPassword'),
    };
    if(this.isDoctor){
      this.addHospitalFormControls();
    }
  }
  addHospitalFormControls() {
    this.register.addControl("hospitalName",this.formbuilder.control('',[Validators.required]));
    this.register.addControl("location",this.formbuilder.control('',[Validators.required]));
    this.register.addControl("pinCode",this.formbuilder.control('',[Validators.required]));
    this.register.addControl("speciality",this.formbuilder.control('',[Validators.required]));
  }


  private setDoctor() {
    const doctor = this.route.snapshot.queryParamMap.get('doctor');
    if (doctor) {
      this.isDoctor = true;
    } else {
      this.isDoctor = false;
    }
  }

  onClickURL(url: string) {
    this.router.navigateByUrl(url);
  }

  submit() {
    if(this.isDoctor){
      this.saveDoctor();
    }else{
      this.savePatient();
    }
  }
  savePatient() {
    console.log(this.register.value)
    let patient: Patient =  new Patient();
    patient.name = this.register.value.name;
    patient.email = this.register.value.email;
    patient.username = this.register.value.username;
    patient.password = this.register.value.password;
    patient.confirmPassword = this.register.value.confirmPassword;
    patient.contactNumber = this.register.value.contactNumber;
    // this.register.value; 
    console.log("Check  :::: ",patient)
    this.patientService.save(patient).subscribe(patient=>{
      console.log("Saved Patient :::: ",patient);
      this.register.reset();
      this.buildFormGroup();
    });
  }
  saveDoctor() {
    let doctor: Doctor = this.register.value;
    let hospital: Hospital = new Hospital();
    hospital.name = this.register.value.hospitalName;
    hospital.location = this.register.value.location;
    hospital.pinCode = this.register.value.pinCode;
    doctor.hospital = hospital;
    console.log("Check  :::: ",doctor)

    this.doctorService.save(doctor).subscribe(doctor=>{
      console.log("Saved doctor :::: ",doctor);
      this.register.reset();
      this.buildFormGroup();
      this.router.navigateByUrl("/login");
    });

  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
    

}


