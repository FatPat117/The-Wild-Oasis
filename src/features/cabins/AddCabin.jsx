import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
        return (
                <Modal>
                        <Modal.Open opens="cabin-form">
                                <Button>Add new cabin</Button>
                        </Modal.Open>
                        <Modal.Window name="cabin-form">
                                <CreateCabinForm />
                        </Modal.Window>

                        {/* <Modal.Open opens="table">
                                <Button>Add new cabin</Button>
                        </Modal.Open>
                        <Modal.Window name="table">
                                <CreateCabinForm />
                        </Modal.Window> */}
                </Modal>
        );
}

// function AddCabin() {
//         const [isOpenModal, setisOpenModal] = useState(false);
//         return (
//                 <div>
//                         <Button onClick={() => setisOpenModal(!isOpenModal)}>Add new cabin</Button>
//                         {isOpenModal && (
//                                 <Modal onClose={() => setisOpenModal(false)}>
//                                         <CreateCabinForm onClose={() => setisOpenModal(false)} />
//                                 </Modal>
//                         )}
//                 </div>
//         );
// }

export default AddCabin;
