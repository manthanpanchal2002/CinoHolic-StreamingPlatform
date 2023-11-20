import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  constructor(private snackBar: MatSnackBar) { }


  // --------------------------------------------- Loader ---------------------------------------------
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  // --------------------------------------------- Snack Bar ---------------------------------------------
  showNotification(msg: string) {
    this.snackBar.open(msg, 'Ok', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  
  // --------------------------------------------- check user login status ---------------------------------------------
  public isUserLoggedIn: boolean = false;


  // --------------------------------------------- Get movieId and movie type ---------------------------------------------

  // Movieid
  private movieId: string = '';
  setmovieId(mId: string) {
    this.movieId = mId;
    // Store to local storage
    localStorage.setItem('movieId', mId);
  }

  getmovieId(): string {
    console.log(" Movie ID from service component : " + this.movieId);
    // Get movieId from local storage
    this.movieId = localStorage.getItem('movieId')!;
    return this.movieId;
  }

  // MovieType
  private movieType: string = '';
  setmovieType(movieType: string) {
    this.movieType = movieType;
    // Store to local storage
    localStorage.setItem('movieType', movieType);
  }

  getmovieType(): string {
    // Get movieType from local storage
    this.movieType = localStorage.getItem('movieType')!;
    return this.movieType;
  }


  // --------------------------------------------- Get userEmail and userId ---------------------------------------------
  private userEmail: string = '';

  setUserEmail(email: string) {
    this.userEmail = email;
    // Store to local storage
    localStorage.setItem('userEmail', email);
  }

  getUserEmail(): string {
    // Get userEmail from local storage
    this.userEmail = localStorage.getItem('userEmail')!;
    return this.userEmail;
  }


  // --------------------------------------------- Get OTP ---------------------------------------------
  private otp: number = 0;

  setOTP(otp: number) {
    this.otp = otp;
  }

  getOTP(): number {
    return this.otp;
  }

}
