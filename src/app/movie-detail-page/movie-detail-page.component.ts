import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { getMovieDetails, addToFavorite } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.css']
})
export class MovieDetailPageComponent implements OnInit {

  movieDetailData: getMovieDetails[] = [];


  constructor(private http: HttpClient, private movieIdService: ServicesService, public loaderService: ServicesService, private userService: ServicesService, private notifier: ServicesService) { }

  private URL = 'http://localhost:8000';

  // Get Movie ID from home component throught service file
  private movieId: string = this.movieIdService.getmovieId();

  // Get userId
  private userEmail: string = this.userService.getUserEmail();

  // Get Movie Info from Database
  getMovieDetailData() {
    return this.http.get<getMovieDetails[]>(`${this.URL}/CinoHolic/api/movie/movie-details/${this.movieId}`).pipe(
      map((response: any) => response.data.movieData)
    ).subscribe((result: getMovieDetails[]) => {
      this.movieDetailData = result;
      console.log("Success!");
    }
    );
  }

  // Add to favorites list
  addToFavorites() {
    const addMovieDetailsToFavorites: addToFavorite[] = [{
      userEmail: this.userEmail,
      movieId: this.movieId,
      movieName: this.movieDetailData[0].movieName,
      genre: this.movieDetailData[0].genre,
    }];
    return this.http.post(`${this.URL}/CinoHolic/api/movie/add-to-favourite`, addMovieDetailsToFavorites, {
      responseType: 'json'
    }).subscribe((result: any) => {
      if (result.status === 'success') {
        this.notifier.showNotification("Added to Favourites");
        console.log('Success');
      } else {
        console.log('Failed');
      }
    });
  }

  // Check if movie is already favorites 
  checkIsFavourite() {
    const isFavoriteData = {
      isFavorite: true
    }
    return this.http.patch(`${this.URL}/CinoHolic/api/movie/check-isFavorite/${this.movieId}`, isFavoriteData, {
      responseType: 'json'
    }).subscribe((result: any) => {
      if (result.status === 'success') {
        console.log('Success');
      } else {
        console.log('Failed');
      }
    });
  }


  ngOnInit() {
    this.getMovieDetailData();
  }

}
