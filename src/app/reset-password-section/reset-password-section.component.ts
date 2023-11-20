import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-reset-password-section',
  templateUrl: './reset-password-section.component.html',
  styleUrls: ['./reset-password-section.component.css']
})
export class ResetPasswordSectionComponent {

  constructor(private http: HttpClient, private router: Router, private userEmailService: ServicesService, public loaderService: ServicesService, private notifier: ServicesService) { }

  @ViewChild('forgotPasswordForm') form!: NgForm;

  responseStatus: number | undefined;
  responseStatusText: string | undefined;

  private URL = 'http://localhost:8000';

  // Get email
  email: string = this.userEmailService.getUserEmail();

  // Submit Form
  resetPassword(userData: any) {
    const passwordData = {
      password: userData.password
    };

    // Regex
    const passwordRegex = /^(?=.*[@#$%^&+=])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/;

    if (userData.createPassword != userData.password) {
      this.responseStatusText = "Password not matched";
    }
    else {
      if ((!passwordRegex.test(userData.password) || userData.password.length < 8) && (!passwordRegex.test(userData.createPassword) || userData.createPassword.length < 8)) {
        this.responseStatusText = "Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character";
      }
      else {

        // API call
        this.http
          .patch(`${this.URL}/CinoHolic/api/user/UpdateUserData/${this.email}`, passwordData, {
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
            console.log(result);
            if (result.status === 'success') {
              console.log('Success');
              this.router.navigate(['/signin-page']);
              this.notifier.showNotification("Password updated successfully");
              this.form.reset();
            } else {
              console.log('Failed');
            }
          });
      }
    }
  }

}
