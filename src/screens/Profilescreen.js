import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader"; // Import the Loader component
import Error from "../components/Error";
import swal from "sweetalert";
import { Tag } from "antd";

const { TabPane } = Tabs;

function Profilescreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  return (
    <div className="ml-3 mt-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="Profile" key="1">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? "Yes" : "No"}</h1>
        </TabPane>
        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Profilescreen;

export function MyBookings() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user._id,
        });
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user._id]);

  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      await axios.post("/api/bookings/cancelbooking", { bookingId });
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: "cancelled" }
          : booking
      );
      setBookings(updatedBookings);
      setLoading(false);
      swal(
        "Booking Cancelled",
        "Your booking has been cancelled",
        "success"
      ).then((result) => {
        window.location.href = "/profile";
      });
    } catch (error) {
      setError(error);
      setLoading(false);
      swal("Failed", "Failed to cancel booking", "error");
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error message="Failed to fetch bookings" />;
  }

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-card bs">
            <h1>{booking.room}</h1>
            <p>Booking ID: {booking._id}</p>
            <p>Transaction ID: {booking.transactionid}</p>
            <p>
              <b>Check In</b> : {booking.fromdate}
            </p>
            <p>
              <b>Check Out</b>: {booking.todate}
            </p>
            <p>
              <b>Amount</b>: {booking.totalamount}
            </p>
            <p>
              <b>Status</b>:{" "}
              {booking.status === "booked" ? (
                <Tag color="green">CONFIRMED</Tag>
              ) : (
                <Tag color="red">CANCELLED</Tag>
              )}
            </p>
            <div className="text-right">
              {booking.status === "booked" && (
                <button
                  className="btn btn-primary"
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No bookings found</p>
      )}
    </div>
  );
}
