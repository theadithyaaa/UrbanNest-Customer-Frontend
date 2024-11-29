import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

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
      Swal.fire({
        title: 'Missing Fields',
        text: 'All fields are required.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  
    if (!emailRegex.test(this.login.email) || !passwordRegex.test(this.login.password)) {
      Swal.fire({
        title: 'Invalid Input',
        text: 'Please enter a valid email address & a password.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
      return;
    }
  
    try {
      Swal.fire({
        title: 'Creating Login...',
        text: 'Please wait while we create your account.',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      let response = await fetch("http://localhost:8080/login/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: this.login.name,
          email: this.login.email,
          password: this.login.password,
        }),
      });
  
      if (!response.ok) {
        Swal.close(); 
        Swal.fire({
          title: 'Error',
          text: 'Failed to create login. Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
        return;
      }
  
      Swal.close(); 
      Swal.fire({
        title: 'Success',
        text: 'Login created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
  
      localStorage.setItem('currentUser', JSON.stringify(this.login));
      window.location.href = '/dashboard';
  
      let body = await response.json();
      Swal.fire({
        title: 'Response Received',
        text: `Response: ${JSON.stringify(body)}`,
        icon: 'info',
        confirmButtonText: 'OK',
      });
  
      return body;
    } catch (error) {
      console.error('Error:', error);
  
      Swal.close(); 
      Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  }
  




  public login1: any = {
    email: "",
    password: "" 
  };

  constructor(private router: Router) {}

 

async logincheck() {
  if (!this.login1.email || !this.login1.password) {
    Swal.fire({
      title: 'Missing Fields',
      text: 'Email and password are required.',
      icon: 'warning',
      confirmButtonText: 'OK',
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.login1.email)) {
    Swal.fire({
      title: 'Invalid Email',
      text: 'Please enter a valid email address.',
      icon: 'error',
      confirmButtonText: 'Retry',
    });
    return;
  }

  try {
    Swal.fire({
      title: 'Logging In...',
      text: 'Please wait while we validate your credentials.',
      icon: 'info',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch("http://localhost:8080/login/get-all");

    if (!response.ok) {
      Swal.close(); 
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch users. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
      return;
    }

    const users = await response.json();

    const validUser = users.find(
      (user: any) =>
        user.email === this.login1.email && user.password === this.login1.password
    );

    Swal.close();

    if (validUser) {
      Swal.fire({
        title: 'Login Successful!',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonText: 'Proceed',
      }).then(() => {
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        this.router.navigate(['/dashboard']);
      });
    } else {
      Swal.fire({
        title: 'Invalid Credentials',
        text: 'The email or password you entered is incorrect.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  } catch (error) {
    console.error('Error:', error);

   
    Swal.close();

    Swal.fire({
      title: 'Error',
      text: 'An error occurred. Please try again.',
      icon: 'error',
      confirmButtonText: 'Retry',
    });
  }
}

}