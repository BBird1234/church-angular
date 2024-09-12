import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Church } from './model/church';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class ChurchService {
  baseUrl = "http://localhost:8084";

  constructor(private httpClient: HttpClient) {}

  public getAllmember(): Observable<Church[]> {
    return this.httpClient.get<Church[]>(`${this.baseUrl}/allmembers`);
  }

  public addmember1(curchmember: any): Observable<Church> {
    return this.httpClient.post<Church>(`${this.baseUrl}/addmember`, curchmember);
  }

  public getmemberById(cid: any): Observable<Church> {
    return this.httpClient.get<Church>(`${this.baseUrl}/get/by/id/${cid}`);
  }

  public deletemember(cid: any): Observable<Church> {
    return this.httpClient.delete<Church>(`${this.baseUrl}/delete/${cid}`);
  }

  public updatemember(cid: any, member: Church): Observable<Church> {
    return this.httpClient.put<Church>(`${this.baseUrl}/update/${member.cid}`, member);
  }

}
