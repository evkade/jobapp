import styled from "styled-components";
import { Job } from "../../../shared/job.type";

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
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%); // center
`

const ButtonListContainer = styled.div`
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

    if (!isShown) {
        return null;
    }

    return (
        <StyledModal>
            <h1> Add new job </h1>
            <ButtonListContainer>
                <button onClick={() => setIsShown(false)}>Cancel</button>
                <button>Confirm</button>
            </ButtonListContainer>
        </StyledModal>
    )
}

export default NewJobModal;