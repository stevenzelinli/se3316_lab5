import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CollectionsComponent } from './collections/collections.component';

import { AuthGuard } from './auth.guard';
import { UserauthService } from './userauth.service';
import { ImagesService } from './images.service';
import { CreateCollComponent } from './create-coll/create-coll.component';

const routes: Routes = [
  { 
    path: 'home',
    component: HomeComponent
  },
  { 
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'register',
    component: RegisterComponent
  },
  {
      path: 'create-coll',
      component: CreateCollComponent,
      canActivate: [AuthGuard]
  },
  {
      path:'collections',
      component: CollectionsComponent,
      canActivate: [AuthGuard]
  },
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    RegisterComponent,
    LoginComponent,
    CollectionsComponent,
    CreateCollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, UserauthService, ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
