import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {

  constructor(private http: HttpClient, private router: Router, private userEmailService: ServicesService, public loaderService: ServicesService) { }

  @ViewChild('userSignUpForm') form!: NgForm;

  private apiUrl = 'http://localhost:8000';
  responseStatus: number | undefined;
  responseStatusText: string | undefined;

  // Get User Email
  userEmail: string = '';

  getUserEmail(emailId: string) {
    this.userEmail = emailId;
    this.userEmailService.setUserEmail(this.userEmail);
  }

  submitForm(userData: signUp) {

    // Regex
    const passwordRegex = /^(?=.*[@#$%^&+=])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailRegex.test(userData.email)) {
      this.responseStatusText = "Invalid email address";
    }

    if (!passwordRegex.test(userData.password) || userData.password.length < 8) {
      this.responseStatusText = "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character";
    }
    else {

      this.http.post(`${this.apiUrl}/CinoHolic/api/user/sign-up`, userData, { responseType: 'json' })
        .pipe(
          catchError((error) => {
            this.responseStatus = error.error.status;
            this.responseStatusText = error.error.message;
            // Handle errors, e.g., show an error message to the user
            return throwError('Something went wrong. Please try again later.');
          })
        )
        .subscribe((result: any) => {
          console.log(result);

          if (result.status == "success") {
            console.log("Success");
            this.getUserEmail(userData.email);
            this.router.navigate(['/home-page']);
            this.form.reset();
          }
          else {
            console.log("Failed");
          }

        })

    }



  }

}
