import styled from "styled-components";
import { Job } from "../../../shared/job.type";
import EmptyJobMessage from "./EmptyJobMessage";
import JobEntry from "./JobEntry";

const JobListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`;

function JobList(props : { 
    jobs: Job[]; 
    setJobs: (jobs: Job[]) => void;
}) {
    const { jobs, setJobs } = props;

    if (jobs.length === 0) {
        return <EmptyJobMessage />
    }

    function deleteJobCallback(jobToDelete: Job) {
        const updatedJobs = jobs.filter(job => job.id !== jobToDelete.id);
        setJobs(updatedJobs);
        postDeleteJob(jobToDelete.id);
    }

    return (
        <JobListContainer>
            {jobs.map((job : Job) => <JobEntry key={job.id} job={job} deleteJob={deleteJobCallback} />)}
        </JobListContainer>
    )
}

export default JobList;

function postDeleteJob(id: number) {
    fetch('http://localhost:3001/deleteJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: id}),
    }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to post delete job");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Successfully posted delete job:", data);
        // Optionally update state or refetch jobs
      })
      .catch((error) => {
        console.error("Error posting delete job:", error);
      });
  }

