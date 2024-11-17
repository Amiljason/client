import React from "react";
import "./Room.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Debugging statements
  console.log("Room Object:", room);
  if (room) {
    console.log("Room Name:", room.name);
    console.log("Room Description:", room.description);
    console.log("Room Image URLs:", room.imageurls);
  } else {
    console.error("Room object is undefined");
  }

  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={room.imageurls[0]} alt="room" className="smallimg" />
      </div>
      <div className="col-md-7">
        <b>
          <h1>{room.name}</h1>
          <p>MAX COUNT: {room.maxcount}</p>
          <p>Phone Number: {room.phonenumber}</p>
          <p>Type: {room.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <Button className="btn btn-primary m-2">Book Now</Button>
            </Link>
          )}

          <button className="btn btn-primary" onClick={handleShow}>
            View Details
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {room.imageurls.map((url, idx) => (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100 bigimg"
                  src={url}
                  alt={`Slide ${idx + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>
            <b>Room Description: {room.description}</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
