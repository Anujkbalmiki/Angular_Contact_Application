import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { myContact } from '../models/myContact';
import { Observable, catchError, throwError } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { myGroup } from '../models/myGroup';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl:string = 'http://localhost:4000'; 
  constructor(private http:HttpClient) {}
   
  public getAllContacts(){
    let dataUrl:string = `${this.baseUrl}/contacts`
    return this.http.get<myContact>(dataUrl).pipe(catchError(this.handleError)) 
   }
  // get single contact
  public getSingleContact(contactId:string):Observable<myContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.get<myContact>(dataUrl);
  }

  // Create Contact
  public createContacts(contact:myContact):Observable<myContact>{
    let dataUrl:string = `${this.baseUrl}/contacts`;
    return this.http.post<myContact>(dataUrl,contact).pipe(catchError(this.handleError))
  }
  // Update Contact
  public updateContacts(contact:myContact,contactId:string):Observable<myContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.put<myContact>(dataUrl,contact).pipe(catchError(this.handleError));
  }
  // Delete Contacts
  public deleteContact(contactId:string):Observable<myContact>{
    let dataUrl:string = `${this.baseUrl}/contacts/${contactId}`;
    return this.http.delete<myContact>(dataUrl).pipe(catchError(this.handleError));
  }
// get All Groups 
  public getGroups():Observable<myGroup>{
    let groupUrl:string = `${this.baseUrl}/groups`;
    return this.http.get<myGroup>(groupUrl).pipe(catchError(this.handleError));
  }
// get single Group
public getGroupByID(contact:myContact):Observable<myGroup>{
  let dataUrl:string= `${this.baseUrl}/groups/${contact.groupId}`;
  return this.http.get<myGroup>(dataUrl)
}

  //  Error solve
  public handleError(error:HttpErrorResponse){
    let errorMessage:string = ``;
    if(error.error instanceof ErrorEvent){
      // client-side error
      errorMessage = `Error: ${error.error.message}`
  }else{
    // server side error
    errorMessage = `Server returned code: ${error.status} \n Message: ${error.message}`;
  }
  return throwError(errorMessage);
}
}
