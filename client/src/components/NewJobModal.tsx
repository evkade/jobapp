import styled from "styled-components";
import { Job } from "../../../shared/job.type";
import Button from "../library/Button";
import { useState } from "react";
import TextInput from "../library/TextInput";

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

function NewJobModal(props : { 
    isShown: boolean; 
    setIsShown: (isShown: boolean) => void;
    setJobs: (jobs: Job[]) => void 
}) {
    const { isShown, setIsShown, setJobs } = props;

    const[newJob, setNewJob] = useState({
        id: -1,
        name: "",
        company: "",
        location: "",
        description: "",
        salaryRange: [0, 0],
        datePosted: new Date("1998-06-19"),
      })

    if (!isShown) {
        return null;
    }

    return (
        <StyledModal>
            <h1> Add new job </h1>
            <TextInput label="Title" value={newJob.name}/>
            <TextInput label="Company" value={newJob.company}/>
            <TextInput label="Location" value={newJob.location}/>
            <ButtonContainer>
                <Button callback={() => setIsShown(false)} label="Cancel"/>
                <Button callback={() => console.log('confirm')} label="Confirm"/>
            </ButtonContainer>
        </StyledModal>
    )
}

export default NewJobModal;