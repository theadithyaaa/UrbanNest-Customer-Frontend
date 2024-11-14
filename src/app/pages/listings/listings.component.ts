import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listings',
  standalone: true,
  imports: [RouterLink, NavbarComponent, NgFor],
  templateUrl: './listings.component.html',
  styleUrl: './listings.component.css'
})
export class ListingsComponent implements OnInit {
  ngOnInit(): void {
    this.getPropertyInfo();
  }

  public propertyInfo:any = []

  async getPropertyInfo() {
    let response = await fetch("http://localhost:8080/property/get-all");
    let body = await response.json();
    this.propertyInfo = body;
    console.log(this.propertyInfo);
    
  }

}

