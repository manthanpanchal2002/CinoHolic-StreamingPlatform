import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.css']
})
export class SupportPageComponent {

  constructor(public loaderService: ServicesService) { }

}
