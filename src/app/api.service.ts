/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { QUESTIONS } from './shared/constants';

/**
 * Api services for the `APIService` model.
 */
@Injectable()
export class APIService {

  constructor(private http: Http) {

  }

  /**
  * Fetches All the Questions from the Constants, we can replace this for API/DB
  * @param {string} API_URL
  * @returns {object} Questions
  *
  */
  public getAllQuestions(): any {
    return QUESTIONS.questions;
  }
}
