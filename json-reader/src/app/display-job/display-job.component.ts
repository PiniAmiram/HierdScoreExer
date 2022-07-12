import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:5000';

interface Candidiate {
  name: string;
  experience: {
    jobTitle: string;
    startDate: Date;
    endDate: Date;
    gap?: string;
  }[];
}

@Component({
  selector: 'app-display-job',
  templateUrl: './display-job.component.html',
  styleUrls: ['./display-job.component.css']
})
export class DisplayJobComponent implements OnInit {
  candidates: Candidiate[] = [];
  message: string = 'Loading...';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<{ candidiates: Candidiate[] }>(baseUrl + '/json-reader')
      .subscribe({
        next: (res) => {
          this.candidates = res?.candidiates || [];
          if (this.candidates.length === 0) {
            this.message = 'No results were found.';
          }
        },
        error: (error) => {
          this.message = 'Something went wrong, please try to refresh the page.';
          console.log('Error when calling the server: ' + error);
        }
      });
  }
}
