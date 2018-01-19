import { AfterViewInit, Component, Input, ViewChild, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatSort, MatTabGroup } from '@angular/material';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { APIService } from './api.service';
import * as _ from 'underscore';
import { Response } from '@angular/http/src/static_response';
import { Observable } from 'rxjs/Rx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ticks = 0;
  title = 'Test Snippet';
  questions: any;
  selectedQuestion: any;
  selectedOptions: any;
  preQDisabled: Boolean = false;
  nxtQDisabled: Boolean = false;
  submissions: Array<any> = [];
  subscription: any;

  constructor(private apiService: APIService) { }

  /**
   * @desc This will called after DOM loaded, we will do API request to get all the questions here
   */
  ngOnInit() {
    this.questions = this.apiService.getAllQuestions();
    console.log(this.questions, this.questions.length);
    if (!this.selectedQuestion) {
      this.selectQuestion(this.questions[0]);
    }
    this.accessNavigation();
  }

  setTicks(timeInSeconds): void {
    this.ticks = timeInSeconds;
  }

  resetTicks(): void {
    this.ticks = 0;
  }

  startTimer(): void {
    const timer = Observable.timer(1000, 1000); // Start Timer after 1 Seconds for each question and increment by 1 seconds
    this.subscription = timer.subscribe(t => {
      this.setTicks(t);
    });
  }

  stopTimer(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  selectQuestion(question): void {
    this.selectedQuestion = {};
    this.selectedQuestion = question;
    this.accessNavigation();
    this.stopTimer();
    this.startTimer();
  }

  preQuestion(): void {
    const self = this;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].id === self.selectedQuestion.id) {
        this.stopTimer();
        this.selectQuestion(self.questions[i - 1]);
        this.accessNavigation();
        return;
      }
    }
  }

  nxtQuestion(): void {
    const self = this;
    for (let i = 0; i < this.questions.length; i++) {
      if (this.questions[i].id === self.selectedQuestion.id) {
        this.stopTimer();
        this.selectQuestion(self.questions[i + 1]);
        this.accessNavigation();
        return;
      }
    }
  }

  checkForAllreadyAnswered(): Boolean {
    let exists = false;
    for (let i = 0; i < this.submissions.length; i++) {
      if (this.submissions[i].id === this.selectedQuestion.id) {
        exists = true;
      }
    }
    return exists;
  }

  setValuesInSubmission(): void {
    const _submit = {};
    _submit['id'] = this.selectedQuestion.id;
    _submit['timeTaken'] = this.ticks;
    _submit['option'] = this.selectedOptions || '';
    this.submissions.push(_submit);
  }

  decideNextQuestion(): void {
    for (let i = 0; i < this.questions.length; i++) {
      if (i === 0) { // Handle first element
        if (this.questions[i].id === this.selectedQuestion.id) {
          this.nxtQuestion();
          break;
        }
      } else if (i === (this.questions.length - 1)) { // Handle last element
        if (this.questions[i].id === this.selectedQuestion.id) {
          this.selectQuestion(this.questions[0]);
          break;
        }
      } else if ((i !== 0) && i !== (this.questions.length - 1)) { // Handle rest of any if middle
        if (this.questions[i].id === this.selectedQuestion.id) {
          this.selectQuestion(this.questions[i + 1]); // set next immediate question
          break;
        }
      }
    }
  }

  submit(): void {
    if (this.submissions && this.submissions.length > 0) {
      const _allReadyExists = this.checkForAllreadyAnswered();
      if (_allReadyExists) {
        for (let i = 0; i < this.submissions.length; i++) {
          if (this.submissions[i].id === this.selectedQuestion.id) {
            this.submissions[i].timeTaken = this.submissions[i].timeTaken + this.ticks;
            this.submissions[i].option = this.selectedOptions || '';
          }
        }
      } else {
        this.setValuesInSubmission(); // Add new answer in submission
      }
    } else {
      this.setValuesInSubmission(); // Add new answer in submission
    }
    this.decideNextQuestion();
    console.log(this.submissions);
  }

  accessNavigation(): void {
    for (let i = 0; i < this.questions.length; i++) {
      if (i === 0) {
        if (this.questions[i].id === this.selectedQuestion.id) {
          this.preQDisabled = true;
        } else {
          this.preQDisabled = false;
        }
      }
      if (i === (this.questions.length - 1)) {
        if (this.questions[i].id === this.selectedQuestion.id) {
          this.nxtQDisabled = true;
        } else {
          this.nxtQDisabled = false;
        }
      }
    }
  }
}



