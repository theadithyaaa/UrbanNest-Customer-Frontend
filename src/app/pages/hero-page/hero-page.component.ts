import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hero-page',
  standalone: true,
  imports: [ RouterLink, FormsModule, CommonModule, ],
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public login: any = {
    name: "",
    email: "",
    password: ""
    
  }
  async createaccount() {
    let response = await fetch("http://localhost:8080/login/add-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        this.login = {
          "name": this.login.name,
          "email": this.login.email,
          "password": this.login.password
          
        }
      )
    })
    alert('accout created successfully');
    let body = await response.json()
    alert(JSON.stringify(body));
    window.location.href = "/dashboard";
    return body;
    
    
  }

}
