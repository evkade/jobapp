import styled from "styled-components";
import { Job } from "../../../shared/job.type";
import StyledButton from "../library/StyledButton";

const JobEntryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const JobButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StyledJobName = styled.h2`
  margin: 10px;
`;

const StyledJobDetail = styled.p`
  margin: 5px;
`;

function JobEntry(props: {
  job: Job;
  deleteJob: (job: Job) => void;
  onUpdateJob: (job: Job) => void;
}) {
  const { job, deleteJob, onUpdateJob } = props;
  return (
    <JobEntryContainer>
      <StyledJobName>{job.name}</StyledJobName>
      <StyledJobDetail>{job.company}</StyledJobDetail>
      <StyledJobDetail>{job.location}</StyledJobDetail>
      <JobButtonsContainer>
        <StyledButton
          onClick={() => onUpdateJob(job)}
          bgColor="#f5d3f3"
          hoverColor="#dab6d8"
          height="18px"
          width="50px"
          fontSize="12px"
        >
          {" "}
          Update{" "}
        </StyledButton>
        <StyledButton
          onClick={() => deleteJob(job)}
          bgColor="#f5d3f3"
          hoverColor="#dab6d8"
          height="18px"
          width="50px"
          fontSize="12px"
        >
          {" "}
          Delete{" "}
        </StyledButton>
      </JobButtonsContainer>
    </JobEntryContainer>
  );
}

export default JobEntry;
