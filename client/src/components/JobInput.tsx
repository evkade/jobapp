import { Job } from "../../../shared/job.type";

function JobInput(props : { setShowModal: (show: boolean) => void }) {
    const { setShowModal } = props;

    return (
        <button onClick={() => setShowModal(true)}>
            Add job
        </button>
    )
}

export default JobInput;