import { Injectable } from '@angular/core';

@Injectable()
export class UserauthService {
    login_status: boolean;
    email: string;
    constructor() {
        this.login_status = false;
        this.email = "";
     }

    isLoggedIn(): boolean{
        return this.login_status;
    }

    login(email: string): void{
        this.email = email;
        this.login_status = true;
    }

    logout(): void{
        this.email = "";
        this.login_status = false;
    }

    getEmail(): string{
        return this.email;
    }
}
