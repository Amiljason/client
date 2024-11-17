import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader"; // Import the Loader component
import Error from "../components/Error"; // Import the Error component
import StripeCheckout from "react-stripe-checkout"; // Import the StripeCheckout component
//import { set } from "mongoose";
import swal from "sweetalert";

function BookingScreen({ match }) {
  const { roomid, fromdate, todate } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [totalDays, setTotalDays] = useState(0);

  function calculateDaysBetweenDates(date1, date2) {
    // Helper function to parse date in dd-mm-yyyy format
    function parseDate(dateStr) {
      const [day, month, year] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    }

    const firstDate = parseDate(date1);
    const secondDate = parseDate(date2);

    // Calculate the difference in time
    const timeDifference = Math.abs(secondDate - firstDate);

    // Convert time difference from milliseconds to days
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return dayDifference;
  }

  useEffect(() => {
    if (fromdate && todate) {
      const days = calculateDaysBetweenDates(fromdate, todate);
      setTotalDays(days);
    }
  }, [fromdate, todate]);

  useEffect(() => {
    const fetchRoom = async () => {
      if (localStorage.getItem("currentUser")) {
        window.location.herf = "/login";
      }

      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid });
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomid]);

  async function onToken(token) {
    console.log(token);

    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate,
      todate,
      totalamount,
      totalDays,
      token,
    };

    try {
      setLoading(true);
      await axios.post("/api/bookings/bookroom", bookingDetails);
      // alert("Room Booked Successfully");
      setLoading(false);
      swal("Congrats!", "Room fetched successfully", "success").then(
        (result) => {
          window.location.href = "/profile";
        }
      );
    } catch (error) {
      console.error("Error booking room:", error);
      // alert("Error booking room");
      setLoading(false);
      swal("Oops!", "Error fetching room", "error");
    }
  }

  const totalamount = (totalDays + 1) * (room ? room.rentperday : 0);

  return (
    <div className="container ">
      <div className="row justify-content-center mt-5 bs">
        {loading && <Loader />}
        {!loading && error && <Error />}
        {!loading && !error && room && (
          <>
            <div className="col-md-5 mt-2">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} alt="room" className="bigimg" />
            </div>
            <div className="col-md-5 mt-2" style={{ textAlign: "right" }}>
              <b>
                <h1>Booking Form</h1>
                <hr />
                {/* Add your booking form here */}
                <hr />
                <p>
                  Name:{JSON.parse(localStorage.getItem("currentUser")).name}
                </p>
                <p>From Date: {fromdate}</p>
                <p>To Date: {todate}</p>
                <p>Max Count: {room.maxcount}</p>
              </b>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total Days: {totalDays + 1}</p>
                  <p>Rent per Day: {room.rentperday}</p>
                  <p>Total Amount: {totalamount}</p>
                </b>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  currency="INR"
                  stripeKey="pk_test_51QAXT6K08W1xMTH41O1VEPHafQmu38iBjXMKKoZfDDvIAHi6iZC9wrBQztitJVmdiTFoitSw7hT7iIphl1x8IR3T00a4wAaV5O"
                >
                  <button className="btn btn-primary">Pay Now</button>
                </StripeCheckout>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingScreen;
