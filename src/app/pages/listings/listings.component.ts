import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [RouterLink, NavbarComponent, NgFor, FormsModule],
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
}