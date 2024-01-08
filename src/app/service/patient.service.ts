import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../model/patient';
import { Constant } from '../model/constant';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  
  constructor(private httpClient: HttpClient) { }

  save(patient: Patient) {
    return this.httpClient.post(`${Constant.BASE_URL}${Constant.PATIENTS}${Constant.REGISTER}`, patient);
  }

}
