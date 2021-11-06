import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new  User();
  erreur = 0;
  constructor(private AuthService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onLoggedin(){
    console.log(this.user);
    let isValidUser: Boolean = this.AuthService.SignIn(this.user);
    if(isValidUser)
    this.router.navigate(['/alerte']);
    else
    //alert("Login ou mot de passe incorrecte!");
    this.erreur = 1;
  }
}
