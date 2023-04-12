import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { environment } from 'src/app/environment/environment';

import { Certificate, PastRequests } from 'src/app/models/Certificates';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private certificateCreated$ = new BehaviorSubject<boolean>(false);
  certificateCreatedValue$ = this.certificateCreated$.asObservable();


  setCertificateCreated(created: boolean) {
    this.certificateCreated$.next(created);
  }
  constructor(private http: HttpClient) { }

  getAll() : Observable<Certificate[]> {
    return this.http.get<Certificate[]>(environment.apiHost + "api/certificate")
  }

  getAllRequests() : Observable<PastRequests[]> {
    return this.http.get<PastRequests[]>(environment.apiHost + "api/certificate/past-requests/")
  }

  isValid(id:number): Observable<boolean>{
    return this.http.get<boolean>(environment.apiHost + "api/certificate/valid/" + id);
  }

  create(date:Date, type:string, issuerSN: string):Observable<Certificate>{
    return this.http.post<Certificate>(environment.apiHost + "api/certificate/", 
    {
      id: 0,
      issuerSN: issuerSN,
      type: type,
      time: date
    });
  }
}
