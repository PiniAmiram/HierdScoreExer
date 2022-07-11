import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:5000';

interface JsonCandidiate {
  contact_info: { 
    name: {
      given_name: string
    }
  },
  experience: {
    description: string;
    start_date: string; 
    end_date: string;
  }[]
}

interface Candidiate {
  name: string;
  experience: {
    jobTitle: string;
    startDate: string;
    endDate: string;
  }[]
}

@Component({
  selector: 'app-display-job',
  templateUrl: './display-job.component.html',
  styleUrls: ['./display-job.component.css']
})
export class DisplayJobComponent implements OnInit {
  candidates: Candidiate[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    try {
      this.http.get(baseUrl + '/json-reader')
        .subscribe((res: any) => {
          this.candidates = this.getCandidiateFromJson(res);
        }
      );
    } catch (error) {
      console.log('Error when calling the server: ' + error);
    }
  }

  getCandidiateFromJson(candidiates: JsonCandidiate[]): Candidiate[] {
    return candidiates.map(({contact_info, experience}: JsonCandidiate) => ({
      name: contact_info?.name?.given_name,
      experience: experience?.map(({description, start_date, end_date}) => ({
        jobTitle: description,
        startDate: start_date,
        endDate: end_date
      }))
    }));
  }
}
