export interface Candidiate {
  name: string;
  experience: Experience[];
}

export interface Experience {
  jobTitle: string;
  startDate: Date;
  endDate: Date;
  gap?: string;
}
