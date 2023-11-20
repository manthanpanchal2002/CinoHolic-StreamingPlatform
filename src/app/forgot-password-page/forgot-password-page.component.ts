import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.css']
})
export class ForgotPasswordPageComponent {

  constructor(private http: HttpClient,private otpService: ServicesService, public loaderService: ServicesService) { }

  @ViewChild('forgotPasswordForm') form!: NgForm;

  responseStatus: number | undefined;
  responseStatusText: string | undefined;
  email_verification: String = '';

  private URL = 'http://localhost:8000';

  // Get OTP and email
  otp: number | undefined;
  email: string | undefined;

  getOtp(otp : number){
    this.otp = otp;
    this.otpService.setOTP(this.otp);
  }

  getEmail(email: string){
    this.email = email;
    this.otpService.setUserEmail(this.email);
  }

  // Verify email 
  verifyUser(userData: any) {

    this.http
      .post(`${this.URL}/CinoHolic/api/user/forgotPassword`, userData, {
        responseType: 'json'
      })
      .pipe(
        catchError((error) => {
          this.responseStatus = error.error.status;
          this.responseStatusText = error.error.message;
          // Handle errors, e.g., show an error message to the user
          return throwError('Something went wrong. Please try again later.');
        })
      ).subscribe((result: any) => {
      this.email_verification = result.status;
      // this.otp = result.data.pin;
      this.getOtp(result.data.pin);
      this.getEmail(userData.email);
      if (result.status == "success") {
        this.form.reset();
      }
      console.log("Success message from forgot-password-page component");
      
    })
  }
}
