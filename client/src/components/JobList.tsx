import styled from "styled-components";
import { Job } from "../../../shared/job.type";
import EmptyJobMessage from "./EmptyJobMessage";
import JobEntry from "./JobEntry";
import { useState } from "react";
import JobDetailsModal, { JobModalType } from "./JobModal";

const JobListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const draftNewJob = {
  id: -1,
  name: "",
  company: "",
  location: "",
  description: "",
  salaryRange: [0, 0] as [number, number],
  datePosted: new Date("1998-06-19"),
};

function JobList(props: {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  jobForUpdate: Job;
  setJobForUpdate: (job: Job) => void;
}) {
  const { jobs, setJobs, jobForUpdate, setJobForUpdate } = props;

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  if (jobs.length === 0) {
    return <EmptyJobMessage />;
  }

  function onUpdateJob(job: Job) {
    setJobForUpdate(job);
    setShowUpdateModal(true);
  }

  function deleteJobCallback(jobToDelete: Job) {
    const updatedJobs = jobs.filter((job) => job.id !== jobToDelete.id);
    setJobs(updatedJobs);
    deleteJob(jobToDelete.id);
  }

  return (
    <>
      <JobListContainer>
        {jobs.map((job: Job) => (
          <JobEntry
            key={job.id}
            job={job}
            deleteJob={deleteJobCallback}
            onUpdateJob={onUpdateJob}
          />
        ))}
      </JobListContainer>
      <JobDetailsModal
        isShown={showUpdateModal}
        setIsShown={setShowUpdateModal}
        jobs={jobs}
        setJobs={setJobs}
        modalType={JobModalType.Update}
        jobForUpdate={jobForUpdate}
        setJobForUpdate={setJobForUpdate}
      />
    </>
  );
}

export default JobList;

function deleteJob(id: number) {
  fetch(`http://localhost:3001/jobs/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
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
