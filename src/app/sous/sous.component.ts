import { AuthService } from './../shared/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SousService } from './../shared/sous.service';
import { SousModel } from './sous.model';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sous',
  templateUrl: './sous.component.html',
  styleUrls: ['./sous.component.css']
})
export class SousComponent implements OnInit {

  
  formValue!: FormGroup;
  SousData!: any;
  showAddSous!: Boolean;
  showUpdateSous!: Boolean;

  SousModelObj: SousModel = new SousModel();
  constructor(private formBuilder: FormBuilder, private sous: SousService, public authService:AuthService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nom: [''],
      services:[''],
      date: [''],
      creerpar: [''],
    })
    this.getAllSous();
  }
  clickAddSous() {
    this.formValue.reset();
    this.showAddSous= true;
    this.showUpdateSous= false;
  }
  postSousDetails() {
    this.SousModelObj.nom = this.formValue.value.nom;
    this.SousModelObj.services= this.formValue.value.services;
    this.SousModelObj.date = this.formValue.value.date;
    this.SousModelObj.creerpar = this.formValue.value.creerpar;

    this.sous.postSous(this.SousModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Sous Service ajoutee avec success!")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllSous();

      },
        err => {
          alert('erreure');

        })
  }

  getAllSous() {
    this.sous.getSous()
      .subscribe(res => {
        this.SousData = res;

      })
  }
  deleteSous(col: any) {
    let conf =confirm("Etes-vous sur de vouloir supprimer?")
    if(conf)
    this.sous.deleteSous(col.id)
      .subscribe(res => {
        alert('Sous service supprimee');
        this.getAllSous();
      })
  }
  onEdit(col: any) {

    this.showAddSous= false;
    this.showUpdateSous= true;

    this.SousModelObj.id = col.id;
    this.formValue.controls['nom'].setValue(col.nom)
    this.formValue.controls['services'].setValue(col.services)
    this.formValue.controls['date'].setValue(col.date)
    this.formValue.controls['creerpar'].setValue(col.creerpar)

  }
  updateSousDetail() {
    this.SousModelObj.nom = this.formValue.value.nom;
    this.SousModelObj.services = this.formValue.value.services;
    this.SousModelObj.date = this.formValue.value.date;
    this.SousModelObj.creerpar = this.formValue.value.creerpar;

    this.sous.updateSous(this.SousModelObj, this.SousModelObj.id)
      .subscribe(res => {
        alert('Sous-Service modifiee avec success');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllSous();
      })
  }
}
