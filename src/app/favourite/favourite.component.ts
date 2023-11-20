import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { HttpClient } from '@angular/common/http';
import { addToFavorite, getMovieDetails } from '../data-type';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  getFavourites: addToFavorite[] = [];

  responseStatus: number | undefined;
  responseStatusText: string | undefined;

  constructor(private http: HttpClient, public loaderService: ServicesService, private userService: ServicesService, private notifier: ServicesService) { }

  private URL = 'http://localhost:8000';

  // Get userId
  private userEmail: string = this.userService.getUserEmail();

  // Get Favourites from Database
  getFavouriteData() {
    return this.http.get<addToFavorite[]>(`${this.URL}/CinoHolic/api/movie/get-favourite-movies/${this.userEmail}`).pipe(
      catchError((error) => {
        console.log(error);
        this.responseStatus = error.error.status;
        this.responseStatusText = error.error.message;
        // Handle errors, e.g., show an error message to the user
        return throwError('Something went wrong. Please try again later.');
      }), map((response: any) => {
        return response.data.movieData;
      }),
    ).subscribe((result: addToFavorite[]) => {
      this.getFavourites = result;
      console.log("Success!");
    }
    );
  }

  // Remove from favourites list
  removeFromFavorites(movieId: string) {
    return this.http.delete(`${this.URL}/CinoHolic/api/movie/delete-favourite-movie/${movieId}`)
      .subscribe((result: any) => {
        if (result.status === 'success') {
          this.notifier.showNotification("Removed from Favourites");
          console.log('Success');
        } else {
          console.log('Failed');
        }
      });
  }

  // Check if movie is already favorites 
  checkIsFavourite(movieId: string) {
    const isFavoriteData = {
      isFavorite: false
    }
    return this.http.patch(`${this.URL}/CinoHolic/api/movie/check-isFavorite/${movieId}`, isFavoriteData, {
      responseType: 'json'
    }).subscribe((result: any) => {
      if (result.status === 'success') {
        console.log('Success');
      } else {
        console.log('Failed');
      }
    });
  }

  // Get Movie Details page
  // Get Movie ID
  movieId: string = '';
  getId(id: string) {
    this.movieId = id;
    this.userService.setmovieId(this.movieId);
    console.log(" Movie ID from home component : " + this.movieId);
  }

  ngOnInit(): void {
    this.getFavouriteData();
  }
}
