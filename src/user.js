import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function User({ modal, handleClose, detail }) {


    return (
        <>
            <Modal show={modal}>
                <Modal.Header>
                    <Modal.Title>{detail.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> Company : {detail.company.bs}</p>
                    <p> Address : {detail.address.city}</p>
                    <p> Geo : {detail.address.geo.lng} | {detail.address.geo.lat}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>)
}