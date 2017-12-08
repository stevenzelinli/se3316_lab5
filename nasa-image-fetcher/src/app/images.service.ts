import { Injectable } from '@angular/core';

@Injectable()
export class ImagesService {
    public img_title: string;
    public img_href: string;
    public img_date: string;

    constructor() { 
        this.img_date = "BLANK";
        this.img_href = "BLANK";
        this.img_title = "BLANK";
    }

    loadImage(title: string, date: string, href: string): void{
        this.img_title = title;
        this.img_href = href;
        this.img_date = date;
    }
}
