const express = require('express');
const cors = require('cors');

import { Job } from '../shared/job.type'; 
import type { Request, Response } from 'express'; 

const app = express();
const PORT = 3001;

app.use(cors()); // need this to allow requests from client

app.get('/', (_req: Request, res: Response) => {
    res.send('server is running!');
  });

// This sets up a HTTP GET endpoint at /list-items 
// when the browser makes a GET request to http://localhost:3001/list-items, the callback 
// ft (req, res) => do smth runs 

const jobs: Job[] = [
  {
    id: 1,
    name: "Frontend Engineer",
    company: "Meta",
    location: "London",
    description: "Work on our modern React stack...",
    salaryRange: [50000, 70000],
    datePosted: new Date("2025-06-01"),
  },
  {
    id: 2,
    name: "Director",
    company: "SEB",
    location: "Stockholm",
    description: "You will be responsible for leading a team of bankers.",
    salaryRange: [80000, 100000],
    datePosted: new Date("2025-04-15"),
  },
  {
    id: 3,
    name: "Teacher",
    company: "Balderskolan",
    location: "Skellefteå",
    description: "You will teach mathematics to high school students.",
    salaryRange: [50000, 60000],
    datePosted: new Date("2025-03-28"),
  },
];

app.get('/jobs', (req: Request, res: Response) => {
    res.json({jobs: jobs});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});