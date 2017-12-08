import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { HttpParams } from '@angular/common/http';
//import { forEach } from '@angular/router/src/utils/collection';
import { ImagesService } from '../images.service';
import { RouterModule, Router } from "@angular/router";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  constructor(
      public imgLoader: ImagesService,
      router: Router
  ) { }

  ngOnInit() {
  }

}
