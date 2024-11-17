import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
//import e from "express";
//import { set } from "mongoose";
const { TabPane } = Tabs;
function Adminscreen() {
  if (
    !localStorage.getItem("currentUser") ||
    !JSON.parse(localStorage.getItem("currentUser")).isAdmin
  ) {
    window.location.href = "/home";
  }

  return (
    <div className="mt-3 ml-3 bs">
      <h1 className="text-center">
        <b> Admin Panel</b>
      </h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
        </TabPane>
        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Room" key="3">
          <AddRoom />
        </TabPane>
        <TabPane tab="User" key="4">
          <User />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Adminscreen;

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/getallbookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Failed to fetch bookings" />;
  }

  return (
    <div>
      <h1>All Bookings</h1>

      <table className="table table-bordered table-responsive-sm table-dark ">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>User ID</th>
            <th>Room ID</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking._id}</td>
              <td>{booking.userid}</td>
              <td>{booking.roomid}</td>
              <td>{booking.fromdate}</td>
              <td>{booking.todate}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Here are total {bookings.length} Bookings</h1>
    </div>
  );
}

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("/api/rooms/getallrooms");
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Failed to fetch rooms" />;
  }

  return (
    <div>
      <h1>All Rooms</h1>

      <table className="table table-bordered table-responsive-sm table-dark ">
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Max Count</th>
            <th>Rent Per Day</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room._id}</td>
              <td>{room.name}</td>
              <td>{room.type}</td>
              <td>{room.maxcount}</td>
              <td>{room.rentperday}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Here are total {rooms.length} Rooms</h1>
    </div>
  );
}

export function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/getallusers");
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message="Failed to fetch users" />;
  }

  return (
    <div>
      <h1>All Users</h1>

      <table className="table table-bordered table-responsive-sm table-dark ">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isadmin ? "YES" : "NO"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Here are total {user.length} Users</h1>
    </div>
  );
}

export function AddRoom() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [maxcount, setMaxcount] = useState("");
  const [rentperday, setRentperday] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [imageurls, setImageurls] = useState("");
  const [imageurls2, setImageurls2] = useState("");
  const [imageurls3, setImageurls3] = useState("");

  const addRoom = async () => {
    const room = {
      name,
      type,
      maxcount,
      rentperday,
      description,
      phone,
      imageurls: [imageurls, imageurls2, imageurls3],
    };

    try {
      await axios.post("/api/rooms/addroom", room);
      alert("Room added successfully");
    } catch (error) {
      console.error("Error adding room:", error);
      alert("Error adding room");
    }
  };

  return (
    <div className="row">
      <div className="col-md-5">
        <h1>Add Room</h1>
        <form>
          <input
            type="text"
            className="form-control"
            placeholder="Room Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Max Count"
            value={maxcount}
            onChange={(e) => setMaxcount(e.target.value)}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Rent Per Day"
            value={rentperday}
            onChange={(e) => setRentperday(e.target.value)}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <div className="row">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Image URL1"
                value={imageurls}
                onChange={(e) => setImageurls(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Image URL2"
                value={imageurls2}
                onChange={(e) => setImageurls2(e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Image URL3"
                value={imageurls3}
                onChange={(e) => setImageurls3(e.target.value)}
              />
            </div>
          </div>
          <button className="btn mt-3" onClick={addRoom}>
            ADD ROOM
          </button>
        </form>
      </div>
    </div>
  );
}
