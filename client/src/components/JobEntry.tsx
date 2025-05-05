import styled from "styled-components";
import { Job } from "../../../shared/job.type";
import StyledButton from "../library/StyledButton";

const JobEntryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledJobName = styled.h2`
    margin: 10px;
`;

const StyledJobDetail = styled.p`
    margin: 5px;
`;

function JobEntry(
    props : { job : Job , deleteJob: (job: Job) => void}
) {
    const { job, deleteJob } = props;
    return (
        <JobEntryContainer >
            <StyledJobName>{job.name}</StyledJobName>
            <StyledJobDetail>{job.company}</StyledJobDetail>
            <StyledJobDetail>{job.location}</StyledJobDetail>
            <StyledButton onClick={() => deleteJob(job)} bgColor='#f5d3f3' hoverColor="#dab6d8" height="25px" width="60px" fontSize="14px"> Delete </StyledButton>
        </JobEntryContainer>
    )
}

export default JobEntry;