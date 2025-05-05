import styled from "styled-components";
import { Job } from "../../../shared/job.type";
import { useState } from "react";
import TextInput from "../library/TextInput";
import StyledButton from "../library/StyledButton";

const StyledModal = styled.div`
    background-color: white; // american spelling
    border: solid black 1px;
    border-radius: 20px; // rounded corners
    height: 500px;
    width: 500px;

    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: space-between;

    position: fixed; // positioning is based on the window instead of its parent
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%); // center
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row; 
    justify-content: space-between;
    width: 80%; // need to have a width to be able to set space-between
    margin: 0 0 20px 0;
`;

const draftNewJob = {
    id: -1,
    name: "",
    company: "",
    location: "",
    description: "",
    salaryRange: [0, 0] as [number, number],
    datePosted: new Date("1998-06-19"),
};

function NewJobModal(props : { 
    isShown: boolean; 
    setIsShown: (isShown: boolean) => void;
    jobs: Job[];
    setJobs: (jobs: Job[]) => void;
}) {
    const { isShown, setIsShown, jobs, setJobs } = props;

    const[newJob, setNewJob] = useState(draftNewJob);

    if (!isShown) {
        return null;
    }

    function addJobCallback(newJob: Job) {
        // Create correct metadata for the job 
        const maxId = jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) : 0;
        const nextId = maxId + 1;
        const now = new Date();
        const jobWithMetadata = { ...newJob, id: nextId, datePosted: now };
        setNewJob(jobWithMetadata); // probably not needed at this point
        setJobs([...jobs, jobWithMetadata]); 
        postNewJob(jobWithMetadata);
        setIsShown(false);
        setNewJob(draftNewJob);
    } 

    return (
        <StyledModal>
            <h1> Add new job </h1>
            <TextInput label="Title" value={newJob.name} setValue={(val) => setNewJob({ ...newJob, name: val })}/>
            <TextInput label="Company" value={newJob.company} setValue={(val) => setNewJob({ ...newJob, company: val })}/>
            <TextInput label="Location" value={newJob.location} setValue={(val) => setNewJob({ ...newJob, location: val })}/>
            <ButtonContainer>
            <StyledButton onClick={() => setIsShown(false)} height="30px" width="70px" fontSize="14px">Cancel</StyledButton>
            <StyledButton onClick={() => addJobCallback(newJob)} height="30px" width="70px" fontSize="14px">Confirm</StyledButton>
            </ButtonContainer>
        </StyledModal>
    )
}

export default NewJobModal;

function postNewJob(newJob: Job) {
    fetch('http://localhost:3001/newJob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({job: newJob}),
    }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to post job");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Successfully posted job:", data);
        // Optionally update state or refetch jobs
      })
      .catch((error) => {
        console.error("Error posting job:", error);
      });
  }