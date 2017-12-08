import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { HttpParams } from '@angular/common/http';
//import { forEach } from '@angular/router/src/utils/collection';
import { UserauthService } from '../userauth.service';
import { RouterModule, Router } from "@angular/router";

@Component({
    selector: 'app-create-coll',
    templateUrl: './create-coll.component.html',
    styleUrls: ['./create-coll.component.css']
})
export class CreateCollComponent implements OnInit {

    public error_msg: string = "";
    constructor(
        private router: Router,
        private http: HttpClient,
        private auth: UserauthService
    ) { }

    ngOnInit() {
    }

    // post to backend to create a collection in the db
    create(coll_name: string, description: string) {
        var body = {
            create_collection_name: coll_name,
            create_collection_author: this.auth.email,
            create_collection_description: description
        }
        this.http.post('/api/collections', body).subscribe(
            data => {
                alert("Collection Created!");
                this.router.navigateByUrl("/profile");
            },
            err => {
                this.error_msg = "Unknown Error";
            }
        );
    }

}
