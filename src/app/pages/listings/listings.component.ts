import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../common/footer/footer.component";
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [RouterLink, NavbarComponent, NgFor, FormsModule, FooterComponent, NgIf],
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  public propertyInfo: any = [];
  public filteredProperties: any = [];
  public district: string = '';

  ngOnInit(): void {
    this.getPropertyInfo();
  }

  async getPropertyInfo() {
    let response = await fetch("http://localhost:8080/property/get-all");
    let body = await response.json();
    this.propertyInfo = body;
    this.filteredProperties = body; 
  }

  search() {
    if (this.district) {
      this.filteredProperties = this.propertyInfo.filter((property: { district: string; }) =>
        property.district.toLowerCase().includes(this.district.toLowerCase())
      );
    } else {
      this.filteredProperties = this.propertyInfo;
    }
  }


  async sendEmail(property: any) {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const recipientEmail = currentUser.email || 'urbannest.test@gmail.com';
  
      const templateParams = {
        property_type: property.type,
        property_location: property.location,
        property_price: property.price,
        property_owner: property.owner,
        owner_contact: property.contact,
        to_email: recipientEmail,
      };
  
      Swal.fire({
        title: 'Sending Email...',
        text: 'Please wait while we send the email.',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      const response = await emailjs.send(
        'service_mwjekw9',
        'template_p5uy7me',
        templateParams,
        '4aWBEX6hIozmLixP3'
      );
  
      Swal.close();
  
      if (response.status === 200) {
        Swal.fire({
          title: 'Email Sent!',
          text: 'An email has been sent successfully to your email.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Failed!',
          text: 'Failed to send email. Please try again later.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    } catch (error) {
      console.error('Error sending email:', error);
  
      Swal.close();
  
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while sending the email. Please try again.',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  }
  

  
}