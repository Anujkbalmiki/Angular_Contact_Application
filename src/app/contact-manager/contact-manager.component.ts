import { Component, OnInit } from '@angular/core';
import { myContact } from '../models/myContact';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-manager',
  templateUrl: './contact-manager.component.html',
  styleUrl: './contact-manager.component.css'
})
export class ContactManagerComponent implements OnInit{
  public loading:boolean = false;
  public contacts:myContact[] = [];
  public errorMessage:string | null = null;


  constructor(private cantService:ContactService){

  }
  ngOnInit(): void{
    this.loading=true;
    this.cantService.getAllContacts().subscribe((data:myContact[])=>{
      this.contacts
    })
  }
    
