import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { liste_Matieres } from "../../shared/data";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  assignmentsForm!: FormGroup;
  nom = "";
  dateDeRendu?: Date;
  auteur = "";
  remarque = "";
  note?: number;
  matiere = "";
  rendu = false;

  listeDesMatieres = liste_Matieres;



  constructor(private assignmentsService: AssignmentsService,
    private router: Router,
    private formBuilder: FormBuilder,
    public snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.assignmentsForm = this.formBuilder.group({
      nom: ['', Validators.required,],
      dateDeRendu: ['',],
      auteur: ['', Validators.required],
      remarque: ['',],
      matiere: ['', Validators.required],
      note: [''],
      rendu: ['',]
    });
  }

  onSubmit(event : Event) {

    if (this.assignmentsForm.status == "VALID") {
      console.log(this.assignmentsForm)
      const newAssignment: Assignment = new Assignment();
      newAssignment.nom = this.assignmentsForm.value['nom'];
      newAssignment.dateDeRendu = this.assignmentsForm.value['dateDeRendu'];
      newAssignment.matiere = this.assignmentsForm.value['matiere'];
      newAssignment.auteur = this.assignmentsForm.value['auteur'];
      newAssignment.note = this.assignmentsForm.value['note'];
      newAssignment.remarque = this.assignmentsForm.value['remarque'];
      newAssignment.rendu = this.rendu;
      if (newAssignment.note == undefined)
        newAssignment.rendu = false;

      this.assignmentsService.addAssignment(newAssignment)
        .subscribe(reponse => {
          console.log(reponse.message);

          this.snackbar.open("Données bien ajouté", 'Succes !!', {
            duration: 2000,

            horizontalPosition: 'center'
          });

          this.router.navigate(['/home']);
        })
    }

  }

  renduStatus() {
    this.rendu = !this.rendu;
  
  }

}
