import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from "@angular/router";

import { UserauthService } from '../userauth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    private error_msg: string;
    constructor(
        private auth: UserauthService,
        private http: HttpClient,
        private router: Router
    ) { }

    ngOnInit() {
        this.error_msg = "";
    }

    register(email: string, password: string, passwordConf: string): boolean {
        if(passwordConf != password){
            this.error_msg = "Passwords do not match.";
            return false;
        }
        else if(email == "" || password == "" || passwordConf == ""){
            this.error_msg = "Please fill in all fields.";
            return false;
        }
        else{
            var body = {
                email: email,
                password: password
            }
            this.http.post('/api/users', body).subscribe(
                data => {
                    this.auth.login(email);
                    this.error_msg = String(this.auth.isLoggedIn());
                    alert("User Created.");
                    this.router.navigateByUrl("/profile");
                },
                err => {
                    this.error_msg = "Duplicate email in system.";
                }
            );
        }
    }
}
