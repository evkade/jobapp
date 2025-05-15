import { createContext, useEffect, useState } from "react";
import { Job } from "../../shared/job.type";
import Header from "./components/Header";
import JobList, { draftNewJob } from "./components/JobList";
import Loading from "./components/Loading";

import styled from "styled-components";
import JobDetailsModal, { JobModalType } from "./components/JobModal";
import StyledButton from "./library/StyledButton";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-color: #fdf2fc;
  height: 100vh;
`;

type JobContextType = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};

export const JobContext = createContext<JobContextType>({
  jobs: [],
  setJobs: () => {},
});

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [jobForUpdate, setJobForUpdate] = useState(draftNewJob);

  useEffect(() => {
    fetch("http://localhost:3001/jobs")
      .then((res) => res.json()) // parse the JSON response
      .then((data) => {
        setJobs(data.jobs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch items:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <JobContext.Provider value={{jobs, setJobs}}>
    <AppContainer>
      <Header />
      <JobList
        jobForUpdate={jobForUpdate}
        setJobForUpdate={setJobForUpdate}
      />
      <StyledButton onClick={() => setShowCreateModal(true)}>
        {" "}
        Add job{" "}
      </StyledButton>
      <JobDetailsModal
        isShown={showCreateModal}
        setIsShown={setShowCreateModal}
        modalType={JobModalType.Create}
        jobForUpdate={jobForUpdate}
        setJobForUpdate={setJobForUpdate}
      />
    </AppContainer>
    </JobContext.Provider>
  );
}

export default App;
