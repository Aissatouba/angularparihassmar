import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../login/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( public router:Router) { }
  users: User[] = [
    {username: "admin", password:"123",roles:['ADMIN']    },
    {username:'user',password:"123", roles:['USER']},
  ]

  public loggedUser: string='';
  public isloggedIn: boolean= false;
  public roles:string[]=[];

  SignIn(user :User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser)=>{
      if(user.username===curUser.username && user.password== curUser.password){
        validUser= true;
        this.loggedUser = curUser.username;
        this.isloggedIn= true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser',this.loggedUser);
        localStorage.setItem('isloggedIn',String(this.isloggedIn));

      }
    });
    return validUser;
  }
  isAdmin():Boolean{
    if(!this.roles)
    return false;
    return(this.roles.indexOf('ADMIN') >-1)
  }
  isChef():Boolean{
    if(!this.roles)
    return false;
    return(this.roles.indexOf('CHEFSERVICE')> -1)
  }
  isUser():Boolean{
    if(!this.roles)
    return false;
    return(this.roles.indexOf('USER') >-1)
  }
}
