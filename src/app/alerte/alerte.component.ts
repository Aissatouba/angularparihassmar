import { ApiService } from './../shared/api.service';
import { AlertModel } from './alerte.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-alerte',
  templateUrl: './alerte.component.html',
  styleUrls: ['./alerte.component.css']
})
export class AlerteComponent implements OnInit {
  formValue!: FormGroup;

  alerteData!: any;
  showAdd!: Boolean;
  showUpdate!: Boolean;
  date:any;

  AlertModelObj: AlertModel = new AlertModel();
  constructor(private formBuilder: FormBuilder, private api: ApiService, public authService: AuthService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      intitule: [''],
      niveaualerte: [''],
      date: [''],
      creerpar: [''],
      Description:[''],
      Longitude:[''],
      Latitude:[''],

      Destinataire: ['']
    })
    this.getAllAlerte();
  }
  clickAddAlerte() {
    this.formValue.reset();
    this.showAdd= true;
    this.showUpdate= false;
  }
  postAlertDetails() {
    this.AlertModelObj.intitule = this.formValue.value.intitule;
    this.AlertModelObj.niveaualerte = this.formValue.value.niveaualerte;
    this.AlertModelObj.date = this.formValue.value.date;
    this.AlertModelObj.creerpar = this.formValue.value.creerpar;
    this.AlertModelObj.Description= this.formValue.value.Description;
    this.AlertModelObj.Latitude = this.formValue.value.Latitude;
    this.AlertModelObj.Longitude = this.formValue.value.Longitude;
    this.AlertModelObj.Destinataire = this.formValue.value.Destinataire;
    this.api.postAlerte(this.AlertModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Alerte ajoutee avec success!")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllAlerte();

      },
        err => {
          alert('erreure');

        })
  }

  getAllAlerte() {
    this.api.getAlerte()
      .subscribe(res => {
        this.alerteData = res;

      })
  }
  deleteAlerte(row: any) {
    let conf =confirm("Etes-vous sur de vouloir supprimer?")
    if(conf)
    this.api.deleteAlerte(row.id)
      .subscribe(res => {
        alert('Alerte supprimee');
        this.getAllAlerte();
      })
        
          
  }
  
  onEdit(row: any) {

    this.showAdd= false;
    this.showUpdate= true;

    this.AlertModelObj.id = row.id;
    this.formValue.controls['intitule'].setValue(row.intitule)
    this.formValue.controls['niveaualerte'].setValue(row.niveaualerte)
    this.formValue.controls['date'].setValue(row.date)
    this.formValue.controls['creerpar'].setValue(row.creerpar)
    this.formValue.controls['Description'].setValue(row.Description)
    this.formValue.controls['Latitude'].setValue(row.Latitude)
    this.formValue.controls['Longitude'].setValue(row.Longitude)
    this.formValue.controls['Destinataire'].setValue(row.Destinataire)

  }
  onView(row:any){

  }
  updateAlerteDetail() {
    this.AlertModelObj.intitule = this.formValue.value.intitule;
    this.AlertModelObj.niveaualerte = this.formValue.value.niveaualerte;
    this.AlertModelObj.date = this.formValue.value.date;
    this.AlertModelObj.creerpar = this.formValue.value.creerpar;
    this.AlertModelObj.Description= this.formValue.value.Description;
    this.AlertModelObj.Latitude = this.formValue.value.Latitude;
    this.AlertModelObj.Longitude = this.formValue.value.Longitude;
    this.AlertModelObj.Destinataire = this.formValue.value.Destinataire;

    this.api.updateAlerte(this.AlertModelObj, this.AlertModelObj.id)
      .subscribe(res => {
        alert('Alerte modifiee avec success');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllAlerte();
      })

  }
}
