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
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!emailRegex.test(this.login.email) || !passwordRegex.test(this.login.password)) {
      alert("Please enter a valid email address & a password");
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



  public login1: any = {
    email: "",
    password: "" 
  };

  constructor(private router: Router) {}

  async logincheck() {
    if (!this.login1.email || !this.login1.password) {
      alert("Email and password are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.login1.email)) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/login/get-all");
      
      if (!response.ok) {
        alert("Failed to fetch users. Please try again.");
        return;
      }

      const users = await response.json();

      const validUser = users.find((user: any) => 
        user.email === this.login1.email && user.password === this.login1.password
      );

      if (validUser) {
        alert('Login successful!');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  }
 
}