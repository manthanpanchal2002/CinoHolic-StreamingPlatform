import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { getMovieInfoList } from '../data-type';

@Component({
  selector: 'app-explore-page',
  templateUrl: './explore-page.component.html',
  styleUrls: ['./explore-page.component.css']
})

export class ExplorePageComponent {

  movieDetailData: getMovieInfoList[] = [];

  constructor(private http: HttpClient, private movieTypeService: ServicesService, private movieIdService: ServicesService) { }

  // Get movie type home component throught service file
  private movieType: string = this.movieTypeService.getmovieType();

  private URL = 'http://localhost:8000';

  // Get movie type from database
  getMovieTypeData(movieType: string) {
    return this.http.get<any>(`${this.URL}/CinoHolic/api/movie/movie/${movieType}`).pipe(
      map((response: any) => response.data.movieData)
    );
  }

  ngOnInit(): void {
    this.getMovieTypeData(this.movieType).subscribe((result: getMovieInfoList[]) => {
      this.movieDetailData = result;
      console.log("Success!");
    });
  }

  // Get Movie ID
  movieId: string = '';
  getId(id: string) {
    this.movieId = id;
    this.movieIdService.setmovieId(this.movieId);
    console.log(" Movie ID from home component : " + this.movieId);
  }


  // Search funcationality
  searchMovie: any;

  


}
