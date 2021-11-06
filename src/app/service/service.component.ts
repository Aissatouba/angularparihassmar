import { AuthService } from './../shared/auth.service';
import { ServicesService } from './../shared/services.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiceModel } from './service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  formValue!: FormGroup;
  ServiceData!: any;
  showAddService!: Boolean;
  showUpdateService!: Boolean;

  ServiceModelObj: ServiceModel = new ServiceModel();
  constructor(private FormBuilder: FormBuilder, private services: ServicesService,public authService:AuthService) { }

  ngOnInit(): void {
    this.formValue = this.FormBuilder.group({
      nom: [''],
      date: [''],
      creerpar: [''],
    })
    this.getAllService();
  }
  clickAddService() {
    this.formValue.reset();
    this.showAddService= true;
    this.showUpdateService= false;
  }
  postServiceDetails() {
    this.ServiceModelObj.nom = this.formValue.value.nom;
    this.ServiceModelObj.date = this.formValue.value.date;
    this.ServiceModelObj.creerpar = this.formValue.value.creerpar;

    this.services.postService(this.ServiceModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Service ajoutee avec success!")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllService();

      },
        err => {
          alert('erreure');

        })
  }

  getAllService() {
    this.services.getService()
      .subscribe(res => {
        this.ServiceData = res;

      })
  }
  deleteService(col: any) {
    let conf =confirm("Etes-vous sur de vouloir supprimer?")
    if(conf)
    this.services.deleteService(col.id)
      .subscribe(res => {
        this.getAllService();
      })
      
  }
  onEdit(col: any) {

    this.showAddService= false;
    this.showUpdateService= true;

    this.ServiceModelObj.id = col.id;
    this.formValue.controls['nom'].setValue(col.nom)
    this.formValue.controls['date'].setValue(col.date)
    this.formValue.controls['creerpar'].setValue(col.creerpar)
    this.formValue.controls['Destination'].setValue(col.Description)

  }
  updateServiceDetail() {
    this.ServiceModelObj.nom = this.formValue.value.nom;
  
    this.ServiceModelObj.date = this.formValue.value.date;
    this.ServiceModelObj.creerpar = this.formValue.value.creerpar;

    this.services.updateService(this.ServiceModelObj, this.ServiceModelObj.id)
      .subscribe(res => {
        alert('Service modifiee avec success');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllService();
      })

  }
}
