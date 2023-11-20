import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-otp-section',
  templateUrl: './otp-section.component.html',
  styleUrls: ['./otp-section.component.css']
})
export class OtpSectionComponent {

  constructor(private http: HttpClient, private router: Router, private otpService: ServicesService, public loaderService: ServicesService) { }

  @ViewChild('otpForm') form!: NgForm;

  responseStatus: number | undefined;
  responseStatusText: string | undefined;

  // Get OTP and Email
  private otp: number = this.otpService.getOTP();
  email: string = this.otpService.getUserEmail();

  // User Entered OTP
  userEnteredOTP: string | undefined;

  


  // Verify OTP
  verifyOTP() {
    if(Number(this.userEnteredOTP) == this.otp){
      this.responseStatus = 200;
      this.form.reset();
    }
    else{
      this.responseStatusText = "Invalid OTP";
    }
  }

}
