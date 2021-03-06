import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: User[] = [{ "username": "admin", "password": "admin", "roles": ['ADMIN'] },
  { "username": "user", "password": "user", "roles": ['USER'] }];

  public loggedUser?: string;
  public isloggedIn: Boolean = false;
  public roles?: string[];

  constructor(private router: Router) { }

  // appelé quand on a rempli le formulaire login/password
  // devrait prendre en params le login et le pass

  logout() {
    this.isloggedIn = false;
    this.loggedUser = undefined;
    this.roles = undefined;
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isloggedIn', String(this.isloggedIn));
    this.router.navigate(['/login']);
  }
 
  SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username === curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', String(this.loggedUser));
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
    
      }
    });

    return validUser;
  }

  isAdmin():Boolean{
    console.log("roles "+this.roles);
    if (!this.roles) //this.roles== undefiened
        return false;
    return (this.roles.indexOf('ADMIN') >-1) ;
    }


 

}
