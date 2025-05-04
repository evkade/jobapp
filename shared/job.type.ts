export interface Job {
    id: number;
    name: string;
    salaryRange: [number, number];
    company: string; 
    location: string;
    description: string;
    datePosted: Date;
  };
