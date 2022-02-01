import { Component } from '@angular/core';

import { AuthService } from './shared/auth.service';
import  { AssignmentsService } from "./shared/assignments.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = "Application de gestion des Assignments";

  constructor(public authService:AuthService,
              private router:Router,
              private assignmentsService: AssignmentsService,
              public snackbar:MatSnackBar) {}

  login() {
    if(!this.authService.isloggedIn) {
    //  this.authService.logIn();
    } else {
      this.authService.logout();
      this.router.navigate(["/home"]);
    }
  }

  peuplerBD() {

    this.assignmentsService.peuplerBDAvecForkJoin().subscribe(() => {
      this.snackbar.open("Données ajoutées",'Succes !!',{
        duration:2000,
       
        horizontalPosition:'center'
      });
     
      
     
    });
  }

 
  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
