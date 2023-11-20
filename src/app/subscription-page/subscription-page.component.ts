import { Component, OnInit } from '@angular/core';
import { getSubscription } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-subscription-page',
  templateUrl: './subscription-page.component.html',
  styleUrls: ['./subscription-page.component.css']
})
export class SubscriptionPageComponent implements OnInit{

  subscriptionData: getSubscription[] = [];

  constructor(private http: HttpClient, public loaderService: ServicesService){}

  private URL = 'http://localhost:8000';

  getSubscription(): Observable<getSubscription[]>{
    return this.http.get<any>(`${this.URL}/CinoHolic/api/subscription/getSubscription`).pipe(
      map((response: any) => response.data.subscription),
    );
  }
  ngOnInit() {
    this.getSubscription().subscribe((result: getSubscription[]) => {
      console.log("Success message from subscription-page-component");
      this.subscriptionData = result;
    })
  }

}
