import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
        const [isOpenModal, setisOpenModal] = useState(false);
        return (
                <div>
                        <Button onClick={() => setisOpenModal(!isOpenModal)}>Add new cabin</Button>
                        {isOpenModal && (
                                <Modal onClose={() => setisOpenModal(false)}>
                                        <CreateCabinForm onClose={() => setisOpenModal(false)} />
                                </Modal>
                        )}
                </div>
        );
}

export default AddCabin;
