import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import * as jwt_decode from 'jwt-decode';
import { OnlineRegistrationDTO } from 'src/app/@sunflower-module/sunflower-ui/model/models';
import { SunflowerUser } from 'src/app/@sunflower-module/sunflower-ui/model/user.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ViewData } from 'src/app/@sunflower-module/sunflower-ui/model/viewData.model';




const httpOptions = {
  headers: new HttpHeaders({ 'Authorization': window.localStorage.getItem('token') }),
  params: new HttpParams().set('page', '0').set('size', '15')
};




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserToken;
  decodedToken;
  baseUrl = 'https://sunflowerfund.azurewebsites.net/api/v1/';

  public modals: any[] = [];
  bodyText: string = null;

  constructor(
    private http: HttpClient,

  ) { }




  // initHeaders(): RequestOptions {
  //   let apiHeaders: RequestOptions = new RequestOptions();
  //   apiHeaders.headers = new Headers();
  //   apiHeaders.params = new URLSearchParams();
  //   apiHeaders.headers.append('token', window.localStorage.getItem('token'));
  //   apiHeaders.params.append('page', '1');
  //   return apiHeaders;
  // }

  /** GET SunflowerUseres from the server */
  getAllSunflowerUseres(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/admin/list`, httpOptions)
      .pipe(
        tap(_ => this.log(`Fetched users`)),
        catchError(this.handleError('GET all users', []))
      );
  }

  NextUserList(pagenumber): Observable<any> {
    httpOptions.params = new HttpParams().set('page', '' + pagenumber).set('size', '20')
    return this.http.get<any>(`${this.baseUrl}/admin/list`, httpOptions)
      .pipe(
        tap(_ => this.log(`Fetched users`)),
        catchError(this.handleError('GET all users', []))
      );
  }

  previouseUserList(pagenumber): Observable<any> {
    httpOptions.params = new HttpParams().set('page', '' + pagenumber).set('size', '20')
    return this.http.get<any>(`${this.baseUrl}/admin/list`, httpOptions)
      .pipe(
        tap(_ => this.log(`Fetched users`)),
        catchError(this.handleError('GET all users', []))
      );
  }



  /** GET SunflowerUseres from the server */
  getCurrentUser(): Observable<OnlineRegistrationDTO[]> {
    return this.http.get<OnlineRegistrationDTO[]>(`${this.baseUrl}/user/details`, httpOptions)
      .pipe(
        tap(_ => this.log(`Fetched users`)),
        catchError(this.handleError('GET all users', []))
      );
  }






  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }

  login(sunflower: { username: string, password: string }) {

    // tslint:disable-next-line:prefer-const
    let httpHeaders = {
      headers: new HttpHeaders().set('email', sunflower.username).set('password', sunflower.password)
    };

    // console.log('got the credentials', sunflower);
    return this.http.get(this.baseUrl + 'login', httpHeaders).
      pipe(
        tap((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.currentUserToken = user.token;
            this.decodedToken = this.getDecodedAccessToken(user.token);
            console.log(this.decodedToken);

          }
        })
        // , catchError(this.handleError('login failed'))
      );
  }

  // POST : add user to the server
  // tslint:disable-next-line:max-line-length
  registerSunflowerUser(sunflower: { username: string, password: string }): Observable<SunflowerUser> {
    console.log(sunflower);
    return this.http.post(this.baseUrl + 'register', sunflower).pipe(
      tap((newSunflowerUser: any) => this.log(`user added successfully !!!`)),
      catchError(
        this.handleError('addSunFlowerUser')
      )
    );

  }



  /** PUT: update the user on the server */
  updateUser(sunflower: SunflowerUser): Observable<any> {
    return this.http.put('this.heroesUrl', sunflower).pipe(
      tap(_ => this.log(`updated user id=${sunflower.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }


  /* GET User whose name contains search term */
  searchSunFlower(term: string): Observable<SunflowerUser[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<SunflowerUser[]>(`${'getUrl'}/?name=${term}`).pipe(
      tap(_ => this.log(`found User matching "${term}"`)),
      catchError(this.handleError<SunflowerUser[]>('searchSunflower', []))
    );
  }




  add(modal: any) {
    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    // remove modal from array of active modals
    this.modals = this.modals.filter(x => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }







  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log aSunflowerUserService message with the MessageService */
  private log(message: string) {
    // this.messageService.add(`SunflowerUserService: ${message}`);
    console.log(message);
  }
}
