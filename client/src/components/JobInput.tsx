import { Job } from "../../../shared/job.type";
import Button from "../library/Button";

function JobInput(props : { setShowModal: (show: boolean) => void }) {
    const { setShowModal } = props;

    return (
        <Button callback={() => setShowModal(true)} label="Add job"/>
    )
}

export default JobInput;