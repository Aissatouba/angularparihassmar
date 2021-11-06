import { Component, OnInit } from '@angular/core';
import { UseropService } from './../shared/userop.service';
import { Invitation } from './invitaion.model';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  formValue!: FormGroup;

  userData!: any;
  showAdd!: Boolean;
  showUpdate!: Boolean;

  UserModelObj: Invitation = new Invitation();
  constructor(private formBuilder: FormBuilder, private userop: UseropService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      nom: [''],
      service: [''],
      
    })
    this.getAllUser();
  }
  clickAddUser() {
    this.formValue.reset();
    
  }
  postUserDetails() {
    this.UserModelObj.nom = this.formValue.value.nom;
    this.UserModelObj.service = this.formValue.value.service;

    this.userop.postUser(this.UserModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Utilisateur ajoutee avec success!")
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllUser();

      },
        err => {
          alert('erreure');

        })
  }

  getAllUser() {
    this.userop.getUser()
      .subscribe(res => {
        this.userData = res;

      })

    }}
