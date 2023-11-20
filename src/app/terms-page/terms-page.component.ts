import { Component, OnInit } from '@angular/core';
import { getTerms } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.css']
})
export class TermsPageComponent implements OnInit {

  termsData: getTerms[] = [];

  constructor(private http: HttpClient, public loaderService: ServicesService) { }

  private URL = 'http://localhost:8000';

  getTermsAndCondition(): Observable<getTerms[]> {
    return this.http.get<any>(`${this.URL}/CinoHolic/api/terms/getTerms`).pipe(
      map((response: any) => response.data.terms),
    );
  }

  ngOnInit() {
    this.getTermsAndCondition().subscribe((result: getTerms[]) => {
      console.log("Success message from terms-page-component");
      this.termsData = result;
    })

  }

}
