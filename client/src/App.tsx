import { useEffect, useState } from 'react';
import { Job } from '../../shared/job.type'; 
import Header from './components/Header';
import JobList from './components/JobList';
import Loading from './components/Loading';

import styled from 'styled-components';
import NewJobModal from './components/NewJobModal';
import StyledButton from './library/StyledButton';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px
`;

function App() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3001/jobs')
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
    <AppContainer>
      <Header/>
      <JobList jobs={jobs} setJobs={setJobs}/>
      <StyledButton onClick={() => setShowModal(true)}> Add job </StyledButton>
      <NewJobModal isShown={showModal} setIsShown={setShowModal} jobs={jobs} setJobs={setJobs} />
    </AppContainer>
  );
}

export default App;
