import { Job } from "../../../shared/job.type";
import EmptyJobMessage from "./EmptyJobMessage";
import JobEntry from "./JobEntry";

function JobList(props : { 
    jobs: Job[]; 
}) {
    const { jobs } = props;

    if (jobs.length === 0) {
        return <EmptyJobMessage />
    }

    return (
        <div>
            {jobs.map((job : Job) => <JobEntry key ={job.id} job={job}/>)}
        </div>
    )
}

export default JobList;