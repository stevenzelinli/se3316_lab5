import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from "@angular/router";

import { UserauthService } from '../userauth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private error_msg: string;
    constructor(
        private auth: UserauthService,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
    }

    login(email: string, password: string): void {
        var body = {
            login_email: email,
            login_password: password
        }
        this.http.post('/api/users', body).subscribe(
            data => {
                this.auth.login(email);
                this.error_msg = String(this.auth.isLoggedIn());
                this.router.navigateByUrl("/profile");
            },
            err => {
                this.error_msg = "Wrong email or password.";
            }
        );
    }
}
