import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';
import { ImagesService } from '../images.service';
import { RouterModule, Router } from "@angular/router";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    private imagesResponse: ImagesResponse;
    constructor(
        private imgLoader: ImagesService,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
    }

    search(what: string): void{
        let params = new HttpParams().set("q", what).set("media_type", "image");
        this.http.get<ImagesResponse>('https://images-api.nasa.gov/search', { params: params }).subscribe(
            data => {
                this.imagesResponse = data;
            },
            err => {
                this.imagesResponse = null;
            }
        );
    }

    addToCollection(title: string, date: string, href: string): void{
        this.imgLoader.loadImage(title, date, href);
        this.router.navigateByUrl("/collections");
    }

}   
interface ImagesResponse{
    collection: {
        href: string;
        items: {
            data: {
                center: string;
                date_created: string;
                description: string;
                keywords: string[];
                media_type: string[];
                nasa_id: string;
                title: string;
            }[];
            href: string;
            links: {
                href: string;
                rel: string;
                render: string;
            }[];
        }[];
        links: {
            href: string;
            prompt: string;
            rel: string;
        }[];
        metadata: {
            total_hits: number;
        };
        version: string;
    };
}
