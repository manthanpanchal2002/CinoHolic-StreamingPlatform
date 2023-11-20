import { Component, OnInit } from '@angular/core';
import { getPrivacy } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-policy-page',
  templateUrl: './policy-page.component.html',
  styleUrls: ['./policy-page.component.css']
})
export class PolicyPageComponent implements OnInit{

  privacyData: getPrivacy[] =[];

  constructor(private http: HttpClient, public loaderService: ServicesService) { }

  private URL = 'http://localhost:8000';

  getPrivacyPolicy(): Observable<getPrivacy[]> {
    return this.http.get<any>(`${this.URL}/CinoHolic/api/privacy/getPrivacy`).pipe(
      map((response: any) => response.data.privacy),
    );
  }

  ngOnInit() {
    this.getPrivacyPolicy().subscribe((result: getPrivacy[]) => {
      console.log("Success message from policy-page-component");
      this.privacyData = result;
    })
  }

}
