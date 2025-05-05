const express = require('express');
const cors = require('cors');

import { Job } from '../shared/job.type'; 
import type { Request, Response } from 'express'; 
// import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

app.use(cors()); // need this to allow requests from client
app.use(express.json()); // parse json 

app.get('/', (_req: Request, res: Response) => {
    res.send('server is running!');
  });

// This sets up a HTTP GET endpoint at /list-items 
// when the browser makes a GET request to http://localhost:3001/list-items, the callback 
// ft (req, res) => do smth runs 
app.get('/jobs', (req: Request, res: Response) => {
    res.json({jobs: jobs});
});

app.post('/newJob', (req: Request, res: Response) => {
    const { job } = req.body;
    if (job) {
        jobs.push(job);
        res.status(200).json({ message: 'New job added.', job });
    } else {
        res.status(400).json({ message: 'Missing job data.' });
    }
});

app.put('/jobs/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { job } = req.body;

  if (!job || !id) {
    return res.status(400).json({ message: 'Missing job data or invalid ID.' });
  }

  const existingJobIndex = jobs.findIndex(existingJob => existingJob.id === id);
  if (existingJobIndex === -1) {
    return res.status(404).json({ message: 'Job not found.' });
  }
  const updatedJob = { ...jobs[existingJobIndex], ...job };
  jobs[existingJobIndex] = updatedJob;

  res.status(200).json({ message: 'Job updated.', jobs: jobs });
});

app.delete('/jobs/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (!isNaN(id)) {
    const initialLength = jobs.length;
    jobs = jobs.filter(job => job.id !== id);
    if (jobs.length < initialLength) {
      res.status(200).json({ message: 'Job deleted.', id });
    } else {
      res.status(404).json({ message: 'Job not found.', id });
    }
  } else {
    res.status(400).json({ message: 'Invalid job ID.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

let jobs: Job[] = [
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