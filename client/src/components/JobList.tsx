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
        deleteJob(jobToDelete.id);
    }

    return (
        <JobListContainer>
            {jobs.map((job : Job) => <JobEntry key={job.id} job={job} deleteJob={deleteJobCallback} />)}
        </JobListContainer>
    )
}

export default JobList;

function deleteJob(id: number) {
    fetch(`http://localhost:3001/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete job");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Successfully deleted job:", data);
        // Optionally update state or refetch jobs
      })
      .catch((error) => {
        console.error("Error while deleting job:", error);
      });
  }

