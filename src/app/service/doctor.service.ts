import { Injectable, Optional } from '@angular/core';
import { Doctor } from '../model/doctor';
import { HttpClient } from '@angular/common/http';
import { Constant } from '../model/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  
  

  constructor(private httpClient: HttpClient) { }

  save(doctor: Doctor) {
    return this.httpClient.post(`${Constant.BASE_URL}${Constant.DOCTORS}${Constant.REGISTER}`,doctor);
  }

  
  searchByText(searchText: string) :  Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`${Constant.BASE_URL}${Constant.DOCTORS}${Constant.FIND}?${Constant.SEARCH}=${searchText}`)
  }
}
