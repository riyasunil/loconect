import React, { useState } from 'react';

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    created_at: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/events/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming JWT token is stored in localStorage
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Event created successfully');
        // Clear form after successful submission
        setFormData({
          title: '',
          description: '',
          created_at: '',
          location: '',
        });
      } else {
        alert('Failed to create event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit}>
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

        <div>
          <label htmlFor="created_at">Date and Time:</label>
          <input
            type="datetime-local"
            id="created_at"
            name="created_at"
            value={formData.created_at}
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
  );
};

export default EventForm;
