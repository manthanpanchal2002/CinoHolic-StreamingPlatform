import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.css']
})
export class SignInPageComponent {

  constructor(private http: HttpClient, private router: Router, private userService: ServicesService, public loaderService: ServicesService) { }

  @ViewChild('userSignInForm') form!: NgForm;
  private apiUrl = 'http://localhost:8000';

  responseStatus: number | undefined;
  responseStatusText: string | undefined;


  // Get User Email
  userEmail: string = '';
  getUserEmail(emailId: string) {
    this.userEmail = emailId;
    this.userService.setUserEmail(this.userEmail);
  }


  // Submit Form
  submitForm(userData: any) {
    this.http
      .post(`${this.apiUrl}/CinoHolic/api/user/sign-in`, userData, {
        responseType: 'json'
      })
      .pipe(
        catchError((error) => {
          this.responseStatus = error.error.status;
          this.responseStatusText = error.error.message;
          // Handle errors, e.g., show an error message to the user
          return throwError('Something went wrong. Please try again later.');
        })
      )
      .subscribe((result: any) => {
        if (result.status === 'success') {
          console.log('Success');
          this.getUserEmail(userData.email);
          // Navigate to home page on success
          this.router.navigate(['/home-page']);
          this.form.reset();
        } else {
          console.log('Failed');
        }
      });

  }

  
}
