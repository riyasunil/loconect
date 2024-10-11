"use client";
import React, { useState, useEffect } from "react";
import api from "@/api/api"; // Ensure that api is a configured Axios instance or similar
import { ACCESS_TOKEN } from "../constants";

const EventView = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    // created_at: "",
    date_and_time: "",
    location: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    const token = localStorage.getItem(ACCESS_TOKEN); // Retrieve the token from localStorage (or sessionStorage)

    if (!token) {
      alert("You are not authorized. Please log in.");
      setLoading(false);
      return;
    }

    api
      .get("/api/events/", {
        headers: {
          Authorization: `Bearer ${token}`, // Add the JWT token to the request headers
        },
      })
      .then((res) => res.data)
      .then((data) => {
        setEvents(data); // Set the events state with data from the API
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((err) => {
        alert("Failed to fetch events");
        console.error(err);
        setLoading(false); // Stop loading if an error occurs
      });
    console.log(events);
  };

  const deleteEvents = (id) => {
    const token = localStorage.getItem(ACCESS_TOKEN); // Token for authorization

    api
      .delete(`/api/events/delete/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 204) {
          alert("Event deleted");
          getEvents(); // Fetch events after deletion
        } else {
          alert("Failed to delete event");
        }
      })
      .catch((err) => {
        alert("Error: " + err.message);
        console.error(err);
      })
      .then(getEvents());
  };

  const createEvent = (e) => {
    e.preventDefault();
    const token = localStorage.getItem(ACCESS_TOKEN); // Token for authorization

    api
      .post("/api/events/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 201) {
          alert("Event created");
          getEvents(); // Fetch events after creation
        } else {
          alert("Failed to create event");
        }
      })
      .catch((err) => {
        alert("Error: " + err.message);
        console.error(err);
      })
      .then(getEvents());
  };

  return (
    <div className="bg-white text-black h-screen flex flex-col justify-items-center">
      <div className="flex flex-col justify-items-center">
        <h2>Create Event</h2>
        <form onSubmit={createEvent}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* <div>
            <label htmlFor="created_at">Created at - Date and Time:</label>
            <input
              type="datetime-local"
              id="created_at"
              name="created_at"
              value={formData.created_at}
              onChange={handleChange}
              required
            />
          </div> */}

          <div>
            <label htmlFor="date_and_time">Date and Time:</label>
            <input
              type="datetime-local"
              id="date_and_time"
              name="date_and_time"
              value={formData.date_and_time}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Create Event</button>
        </form>
      </div>

      <h1>Event List</h1>
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <ul>
          {events.length > 0 ? (
            events.map((event) => (
              <li key={event.id}>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.created_at).toLocaleString()}
                </p>
                <button
                  className="border border-black p-2"
                  onClick={() => deleteEvents(event.id)}
                  type="delete"
                >
                  delete event
                </button>
              </li>
            ))
          ) : (
            <p>No events found</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default EventView;
