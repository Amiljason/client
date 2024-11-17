import React, { useState, useEffect } from "react";
import axios from "axios";
//import moment from "moment";
import Room from "../components/Room";
import Loader from "../components/Loader";
// import Error from "../components/Error";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [setError] = useState(false);
  //const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [Type, setType] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get("/api/rooms/getallrooms")).data;
        setRooms(data);
        //setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [setError]);

  function filterByDate(dates) {
    setFromDate(dates[0].format("DD-MM-YYYY"));
    setToDate(dates[1].format("DD-MM-YYYY"));
  }

  function filterBySearch() {
    let tempRooms = rooms;
    if (searchKey !== "") {
      tempRooms = tempRooms.filter((room) =>
        room.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }
    setRooms(tempRooms);
  }

  function filterByType(type) {
    setType(type);
    let tempRooms = rooms;
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type.toLowerCase() === type);
    }
    setRooms(tempRooms);
  }

  return (
    <div className="container">
      <div className="row mt-5 ml-5 mr-6 bs">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="search rooms"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={Type}
            onChange={(e) => setType(filterByType(e.target.value))}
          >
            <option value="all">All</option>
            <option value="deluxe">Deluxe</option>
            <option value="non-deluxe">Non-Deluxe</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : (
          rooms.map((room) => (
            <div className="col-md-9 mt-2" key={room._id}>
              <Room room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
