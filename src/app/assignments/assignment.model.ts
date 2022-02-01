import { AssignmentsComponent } from "./assignments.component";

export class Assignment {
  id!:number;
  _id?:string;
  nom!:string;
  dateDeRendu?:Date;
  matiere!: number;
  auteur!: string;
  note!: number;
  remarque: string | undefined;
  rendu?:boolean;
  

}


