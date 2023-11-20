import { Component, OnInit } from '@angular/core';
import { getMovieInfoList } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})


export class HomePageComponent implements OnInit {

  allCollectionData: getMovieInfoList[] = [];

  constructor(private http: HttpClient, private movieIdService: ServicesService, private movieTypeService: ServicesService, public loaderService: ServicesService) { }


  private URL = 'http://localhost:8000';

  // Get Movie Info from Database
  getMovieInfo(): Observable<getMovieInfoList[]> {
    return this.http.get<any>(`${this.URL}/CinoHolic/api/movie/get-movies-info`).pipe(
      map((response: any) => response.data.movieData)
    );
  }

  ngOnInit() {
    this.getMovieInfo().subscribe((result: getMovieInfoList[]) => {
      console.log("Success message from home-page-component");
      this.allCollectionData = result;
    })
  }




  // Get Movie ID
  movieId: string = '';
  getId(id: string) {
    this.movieId = id;
    this.movieIdService.setmovieId(this.movieId);
    console.log(" Movie ID from home component : " + this.movieId);
  }

  // Get Movie DataType
  movieType: string = '';
  getType(type: string) {
    this.movieType = type;
    this.movieTypeService.setmovieType(this.movieType);
    console.log(" Movie Type from home component : " + this.movieType);
  }

  // Search funcationality
  searchMovie: any;




}
