import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    private imagesResponse: ImagesResponse;
    constructor(
        private http: HttpClient
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
