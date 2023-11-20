import { Component, OnInit, ViewChild } from '@angular/core';
import { updateUserDetails, userDetails } from '../data-type';
import { ServicesService } from '../services/services.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-my-space-page',
  templateUrl: './my-space-page.component.html',
  styleUrls: ['./my-space-page.component.css']
})
export class MySpacePageComponent implements OnInit {

  userDetailData: userDetails[] = [];

  constructor(private http: HttpClient, private userEmailService: ServicesService, public loaderService: ServicesService, private notifier: ServicesService) { }

  // Get User Email
  private userEmail: string = this.userEmailService.getUserEmail();

  private URL = 'http://localhost:8000';

  // Get UserDetails from Database
  getUserDetailData(email: string) {
    return this.http.get<userDetails[]>(`${this.URL}/CinoHolic/api/user/UserDetails/${email}`).pipe(
      map((response: any) => response.data.userData)
    );
  }

  ngOnInit() {
    this.getUserDetailData(this.userEmail).subscribe((result: userDetails[]) => {
      this.userDetailData = result;
      console.log("Success messasge from my-space-page component");
    });
  }

  // Update User Details
  @ViewChild('updateDetails') form!: NgForm;
  responseStatus: number | undefined;
  responseStatusText: string | undefined;
  submitDetails(userData: updateUserDetails) {

    // Check if the fields have non-empty values and add them to updateDetails.
    const updateDetails: any = {};

    // Check for empty fields
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.createPassword) {
      this.notifier.showNotification("Please fill in data to update");
      return; 
    }

    if (userData.firstName) {
      updateDetails.firstName = userData.firstName;
    }

    if (userData.lastName) {
      updateDetails.lastName = userData.lastName;
    }

    if (userData.email) {
      updateDetails.email = userData.email;
    }

    if (userData.password) {
      updateDetails.password = userData.password;
    }



    // If user wants to reset password
    if (updateDetails.password) {
      // Regex
      const passwordRegex = /^(?=.*[@#$%^&+=])(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/;

      if (userData.createPassword != userData.password) {
        this.notifier.showNotification("Password not matched");
      }
      else {
        if ((!passwordRegex.test(userData.password) || userData.password.length < 8) && (!passwordRegex.test(userData.createPassword) || userData.createPassword.length < 8)) {
          this.notifier.showNotification("Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character");
        }
        else {
          // API call
          this.http
            .patch(`${this.URL}/CinoHolic/api/user/UpdateUserData/${this.userEmail}`, updateDetails, {
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
                this.notifier.showNotification("Password updated successfully");
                this.form.reset();
              } else {
                console.log('Failed');
              }
            });
        }
      }
    }
    // If user wants to reset anything else
    else {
      // API call
      this.http
        .patch(`${this.URL}/CinoHolic/api/user/UpdateUserData/${this.userEmail}`, updateDetails, {
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
            this.notifier.showNotification("Details updated successfully");
            this.form.reset();
          } else {
            console.log('Failed');
          }
        });
    }

  }

}
