import { Hospital } from "./hospital";
import { User } from "./user";

export class Doctor extends User{
    
    speciality:string = "";
    image:string = "";
    hospital: Hospital | undefined ;

}