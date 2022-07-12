export interface JsonCandidiate {
  contact_info: { 
    name: {
      given_name: string
    }
  },
  experience: JsonExperience[];
}

export interface JsonExperience {
  title: string;
  start_date: Date; 
  end_date: Date;
}
