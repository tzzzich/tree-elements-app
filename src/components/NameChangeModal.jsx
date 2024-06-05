import { Form, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NameChangeModal({baseName, show, toggleModal, onSubmit}) {
    return (
        <Modal 
            show={show} 
            onHide={toggleModal}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit node</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group id="name">
                        <Form.Label>Node name</Form.Label>
                        <Form.Control className="mb-3" type="text" name="name" defaultValue={baseName}/>
                    </Form.Group>
                    <button type="submit">Submit</button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}