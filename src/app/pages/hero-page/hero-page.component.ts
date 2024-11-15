import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [ RouterLink, FormsModule, CommonModule, NgFor ],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})

export class HeroPageComponent {
  public login: any = {
    name: "",
    email: "",
    password:"" 
  }
  
  async logincreate() {
    let response = await fetch("http://localhost:8080/login/add-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        this.login = {
          "name": this.login.name,
          "email": this.login.email,
          "password": this.login.password,
          
        }
      )
    })
    alert('login created successfully');
    window.location.href = "http://localhost:4200/dashboard";
    let body = await response.json()
    alert(JSON.stringify(body));
    return body;
    
  }

  // clearFields() {
  //   this.property = {
  //     owner: "",
  //     ownercontact: "",
  //     location: "",
  //     district: "",
  //     price: "",
  //     type: ""
  //   };
  // }

}