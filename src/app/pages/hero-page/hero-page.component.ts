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
    if (!this.login.name || !this.login.email || !this.login.password) {
      alert("All fields are required");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.login.email)) {
      alert("Please enter a valid email address");
      return;
    }
  
    try {
      let response = await fetch("http://localhost:8080/login/add-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.login.name,
          email: this.login.email,
          password: this.login.password
        })
      });
  
      if (!response.ok) {
        alert("Failed to create login. Please try again.");
        return;
      }
  
      alert('Login created successfully');
      window.location.href = "/dashboard";
      let body = await response.json();
      alert(JSON.stringify(body));
      return body;
  
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }
}