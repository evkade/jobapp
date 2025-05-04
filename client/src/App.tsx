import { useEffect, useState } from 'react';
import { Job } from '../../shared/job.type'; 

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/jobs')
      .then((res) => res.json()) // Parse the JSON response
      .then((data) => {
        setJobs(data.jobs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch items:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (jobs === undefined || jobs === null) {
    return <div> Jobs is null. </div>
  };

  return (
    <div>
      <h1>List of Items:</h1>
        {jobs.length === 0 && <p> No items found. </p>}
        {jobs.map((job) => {
          console.log(job);
          return (<div key={job.id}>{job.name}</div>)
        })}
    </div>
  );
}

export default App;
