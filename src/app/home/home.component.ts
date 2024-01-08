import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { Doctor } from '../model/doctor';
import { Hospital } from '../model/hospital';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../service/doctor.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[DoctorService]
})
export class HomeComponent implements AfterViewInit {


  imageArray = ['a','b','c','d','e','f'];
  searchText="";
  doctors: Doctor[] =[] ;

  constructor(private cdr: ChangeDetectorRef, private doctorService: DoctorService) {
    let doctor = new Doctor();
    doctor.contactNumber = "9898989898";
    doctor.email = "email@doctor.com";
    doctor.name = "doctor name"
    doctor.speciality = "specitiality"
    let hospital = new Hospital();
    hospital.location = "surat";
    hospital.name = "Apollo";
    doctor.hospital = hospital;
    doctor.image = this.getRandomImage();
    this.doctors.push(doctor)
  }
  
  ngAfterViewInit(): void {

    this.cdr.detectChanges();
  }

  getRandomImage(){
    let baseUrl = "./../../assets/images/"
    let randomImage =  Math.floor(Math.random() * this.imageArray.length);
    return baseUrl+this.imageArray[randomImage]+".jpg";
  }

  searchDoctor() {

    this.doctorService.searchByText(this.searchText).subscribe(doctors=>{
      if(doctors) {
        for(let doc of doctors){
          doc.image = this.getRandomImage();
        }
        this.cdr.detectChanges();
        this.doctors = doctors;
      }

      console.log('Doctors :::: \n',this.doctors);
      ;
    });
  }

}
