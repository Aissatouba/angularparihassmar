import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlerteComponent } from './alerte/alerte.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ServiceComponent } from './service/service.component';
import { SousComponent } from './sous/sous.component';
import { OperationComponent } from './operation/operation.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    AlerteComponent,
    ServiceComponent,
    SousComponent,
    OperationComponent,
    DashboardComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,

    DataTablesModule,

    RouterModule.forRoot([
      {path:'',component:DashboardComponent,children :[
        {path:'login',component:LoginComponent},
      {path :'alerte',component:AlerteComponent},
      {path : 'service',component:ServiceComponent},
      {path:'sous',component:SousComponent},
      {path:'operation',component:OperationComponent},
      
    ]}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
