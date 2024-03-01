import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Popup = (props: IPopupType) => {

  const [show, setShow] = useState(props.isShow);

  const handleClose = () => setShow(false);
  const handleSubmit = () => {
    setShow(false);
    setShow(false);
    props.onClick();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.body}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}