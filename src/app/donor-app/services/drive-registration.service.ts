import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { PreScreeeningQuestion } from 'src/app/@sunflower-module/sunflower-ui/model/preScreeningQuestion.model';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonalDetailsDTO } from 'src/app/@sunflower-module/sunflower-ui/model/personalDetailsDTO';
import { ToastrService } from 'ngx-toastr';
import { healthScreenQuestion } from 'src/app/@sunflower-module/sunflower-ui/model/healthScreenQuestion.model';
import { pipe } from '@angular/core/src/render3';
import { Answer } from 'src/app/@sunflower-module/sunflower-ui/model/answer';

const httpOptions = {
  headers: new HttpHeaders().set('email', 'sunflowerfund@younglings.africa').set('password', 'sunflower10')
};

// const httpParams = {
//   params: new HttpParams().set('email', 'sunflowerfund@younglings.africa').set('password', 'sunflower10')
// };
@Injectable({
  providedIn: 'root'
})
export class DriveRegistrationService {
  step = 1;
  baseUrl = 'https://sunflowerfund.azurewebsites.net/api/v1/';
  weight = 0;
  height = 0;
  email = null;
  cellnumber = null;
  bmi = '';
  questionar;

  consented = {
    'commsInd': 1,
    'hla_Confirm': 1,
    'stemCell_Confirm': 1,
    'signature': null
  };

  CurrentUID = 0;

  public modals: any[] = [];



  personalDetails: PersonalDetailsDTO;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,

  ) { }

  getPrescreeningQuestion(): Observable<PreScreeeningQuestion[]> {

    return this.http.get<PreScreeeningQuestion[]>(this.baseUrl + 'prequestions', httpOptions)
      .pipe(
        tap(_ => this.log(`Fetched Prescreening Questions`)),
        catchError(this.handleError('GET PreScreening questions', []))
      );
  }

  sendPrescreeningAnswers(answers) {
    return this.http.post(`${this.baseUrl}o_registration`, answers, httpOptions)

      .pipe(
        tap(_response => this.log('Posted Prescreening Answers')),
        catchError(this.handleError('POST PreScreening answers failed', []))
      );
  }

  sendPersonalInformation(personalInfo) {
    console.log('check for personal info', personalInfo);

    return this.http.patch(`${this.baseUrl}o_registration/${this.CurrentUID}/personaldetails`, personalInfo, httpOptions)
      .pipe(
        tap(res_ =>
          // console.log('results', res_)
          this.log('Posted Personal Information ')
        ),
        catchError(this.handleError('PATCH Personal Information failed', []))
      );
  }
  consentToPersonalData() {

    return this.http.patch(`${this.baseUrl}o_registration/${this.CurrentUID}/consent`, this.consented, httpOptions)
      .pipe(
        tap(_ => this.log('Posted consent')),
        catchError(this.handleError('PATCH consent failed', []))
      );
  }



  getHealthScreenQuestion(): Observable<healthScreenQuestion[]> {

    return this.http.get<healthScreenQuestion[]>(`${this.baseUrl}questions`, httpOptions)
      .pipe(
        tap(_ => this.log('Fetched HealthScreen Questions')),
        catchError(this.handleError('GET HealthScreen questions', []))
      );
  }

  getEthnicGroups() {
    return this.http.get(`${this.baseUrl}ethnicgroups`, httpOptions)
      .pipe(
        tap(_ => this.log('Fetched ethnic groups')),
        catchError(this.handleError('GET ethnic groups failed', []))
      );
  }
  getCountryCodes() {
    return this.http.get(`${this.baseUrl}countrycode`, httpOptions)
      .pipe(
        tap(_ => this.log('Fetched countries')),
        catchError(this.handleError('GET countries failed', []))
      );
  }
  getRelationships() {
    return this.http.get(`${this.baseUrl}relationships`, httpOptions)
      .pipe(
        tap(_ => this.log('Fetched relationships')),
        catchError(this.handleError('GET relationships failed', []))
      );
  }

  sendHealthScreenAnswers(answers) {
    return this.http.patch(`${this.baseUrl}o_registration/${this.CurrentUID}/health`, answers, httpOptions)

      .pipe(
        tap(_response => this.log('PATCHED Health Screen Answers')),
        catchError(this.handleError('Patching Health Screen Answers failed', []))
      );
  }

  answerHealthScreenAnswers(answers: Array<Answer>) {
    console.log(answers);
    return this.http.patch(`${this.baseUrl}o_registration/${this.CurrentUID}/health`, answers, httpOptions)
      .pipe(
        tap(_response => this.log('PATCHED Health Screen Answers')),
        catchError(this.handleError('Patching Health Screen Answers failed', []))
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
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
  }

  close(id: string) {
    // close modal specified by id
    let modal: any = this.modals.filter(x => x.id === id)[0];
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

  /** Log a message with the MessageService */
  private log(message: string) {
    console.log(message);
  }


  showToaster(type, msg) {

    if (type === 'error') {
      this.toastr.error(msg, 'Error');

    }
    if (type === 'success') {
      this.toastr.success(msg, 'Success');

    }
    if (type === 'warn') {
      this.toastr.warning(msg, 'Warning');

    } if (type === 'info') {
      this.toastr.info(msg, 'Info');

    }
  }


}
