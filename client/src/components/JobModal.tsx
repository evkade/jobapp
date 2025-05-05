import styled from "styled-components";
import { Job } from "../../../shared/job.type";
import { useState } from "react";
import TextInput from "../library/TextInput";
import StyledButton from "../library/StyledButton";
import { draftNewJob } from "./JobList";

export enum JobModalType {
  Update,
  Create,
}

const StyledModal = styled.div`
  background-color: white;
  border: solid black 1px;
  border-radius: 20px; // rounded corners
  height: 500px;
  width: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed; // positioning is based on the window instead of its parent
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%); // center
  z-index: 1000; // must be above the overlay
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1); // semi-transparent black
  z-index: 999; // ensure it's above other content but below the modal
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 50px 0 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80%; // need to have a width to be able to set space-between
  margin: 200px 0 20px 0;
`;

function JobDetailsModal(props: {
  isShown: boolean;
  setIsShown: (isShown: boolean) => void;
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  modalType: JobModalType;
  jobForUpdate: Job;
  setJobForUpdate: (job: Job) => void;
}) {
  const {
    isShown,
    setIsShown,
    jobs,
    setJobs,
    modalType,
    jobForUpdate,
    setJobForUpdate,
  } = props;

  if (!isShown) {
    return null;
  }

  function addJob(job: Job) {
    const maxId = jobs.length > 0 ? Math.max(...jobs.map((j) => j.id)) : 0;
    const nextId = maxId + 1;
    const now = new Date();
    const jobWithMetadata = { ...job, id: nextId, datePosted: now };
    fetch("http://localhost:3001/newJob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job: job }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to post job");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Successfully posted job:", data);
        setJobs([...jobs, jobWithMetadata]);
        setIsShown(false);
        setJobForUpdate(draftNewJob);
      })
      .catch((error) => {
        console.error("Error posting job:", error);
      });
  }

  function updateJob(job: Job) {
    fetch(`http://localhost:3001/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ job: job }),
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.jobs);
        setIsShown(false);
        setJobForUpdate(draftNewJob);
      })
      .catch((error) => console.error("Error:", error));
  }

  function callback(job: Job) {
    if (modalType === JobModalType.Create) {
      return addJob(job);
    } else {
      return updateJob(job);
    }
  }

  return (
    <>
    <StyledOverlay />
    <StyledModal>
      {modalType === JobModalType.Create ? (
        <h1> Add new job </h1>
      ) : (
        <h1> Update job </h1>
      )}
      <InputContainer>
        <TextInput
          label="Title"
          value={jobForUpdate.name}
          setValue={(val) => setJobForUpdate({ ...jobForUpdate, name: val })}
        />
        <TextInput
          label="Company"
          value={jobForUpdate.company}
          setValue={(val) => setJobForUpdate({ ...jobForUpdate, company: val })}
        />
        <TextInput
          label="Location"
          value={jobForUpdate.location}
          setValue={(val) =>
            setJobForUpdate({ ...jobForUpdate, location: val })
          }
        />
      </InputContainer>
      <ButtonContainer>
        <StyledButton
          onClick={() => setIsShown(false)}
          height="30px"
          width="70px"
          fontSize="14px"
        >
          Cancel
        </StyledButton>
        <StyledButton
          onClick={() => callback(jobForUpdate)}
          height="30px"
          width="70px"
          fontSize="14px"
        >
          Confirm
        </StyledButton>
      </ButtonContainer>
    </StyledModal>
    </>
  );
}

export default JobDetailsModal;
