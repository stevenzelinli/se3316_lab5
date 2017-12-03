import { Component, OnInit } from '@angular/core';
import { UserauthService } from '../userauth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    private email: string;
    constructor(
        private auth: UserauthService
    ) { }

    ngOnInit() {
        this.email = this.auth.getEmail();
    }

    logout(): void{
        this.auth.logout();
    }

}
