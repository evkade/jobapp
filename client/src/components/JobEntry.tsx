import styled from "styled-components";
import { Job } from "../../../shared/job.type";

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
    props : { job : Job }
) {
    const { job } = props;
    return (
        <JobEntryContainer >
            <StyledJobName>{job.name}</StyledJobName>
            <StyledJobDetail>{job.company}</StyledJobDetail>
            <StyledJobDetail>{job.location}</StyledJobDetail>
        </JobEntryContainer>
    )
}

export default JobEntry;