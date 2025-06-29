import React, { useState } from 'react';

const Event = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '' });

  const dummyEvents = [
    {
      _id: '1',
      title: 'Clothes Donation Drive',
      description: 'Help us collect warm clothes for the upcoming winter.',
      date: '2025-07-05T10:00:00Z'
    },
    {
      _id: '2',
      title: 'Food Distribution @ Shelter',
      description: 'Join us to distribute home-cooked meals.',
      date: '2025-07-12T16:00:00Z'
    },
    {
      _id: '3',
      title: 'Neighborhood Cleanup',
      description: 'Let’s make our parks and streets clean again!',
      date: '2025-07-20T08:30:00Z'
    }
  ];

  const handleSelect = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="p-6 space-y-6 mt-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">🌟 Community Events</h1>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className="bg-indigo-600 text-white px-4 py-2 rounded shadow"
        >
          {isAdmin ? '🔒 Admin Mode' : '🔓 User Mode'}
        </button>
      </div>

      {isAdmin && (
        <div className="p-4 border rounded-md bg-gray-50 space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">📝 Create New Event</h2>
          <input
            className="w-full border p-2 rounded"
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <textarea
            className="w-full border p-2 rounded"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600">
            ➕ Create Event
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyEvents.map((event) => (
          <div
            key={event._id}
            className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
            <p className="text-gray-600">{event.description}</p>
            <p className="text-sm text-gray-400 mt-1">📅 {new Date(event.date).toDateString()}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => handleSelect(event)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                📄 View
              </button>
              <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600">
                🤝 Join
              </button>
              {isAdmin && (
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                  🎁 Reward
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="p-5 border-t pt-6 space-y-3 bg-gray-50 rounded-md shadow-inner mt-6">
          <h2 className="text-2xl font-bold text-gray-700">📌 Event Details</h2>
          <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
          <p>{selectedEvent.description}</p>
          <p className="text-sm text-gray-500">📅 {new Date(selectedEvent.date).toLocaleString()}</p>
          <div className="flex gap-3 mt-2">
            <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
              Join
            </button>
            {isAdmin && (
              <button className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600">
                Reward
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
