import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserauthService } from '../userauth.service';
import { RouterModule, Router } from "@angular/router";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    private email: string;
    constructor(
        private auth: UserauthService,
        private http: HttpClient,

    ) { }

    ngOnInit() {
        this.email = this.auth.getEmail();
    }

    // call service to logout
    logout(): void{
        this.auth.logout();
    }

    // load collections, called
    getCollections(): void{
        // this.http.post('/api/collections', body).subscribe(
        //     data => {
        //         alert("Collection Created!");
        //         this.router.navigateByUrl("/profile");
        //     },
        //     err => {
        //         this.error_msg = "Unknown Error";
        //     }
        // );
    }
}

