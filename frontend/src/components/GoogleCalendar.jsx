import React, { useState } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker

function GoogleCalendar() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession(); // Gets the current session
  const supabase = useSupabaseClient(); // Supabase client for OAuth
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  const googleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { scopes: 'https://www.googleapis.com/auth/calendar' },
    });
    if (error) {
      console.error("Error logging in with Google", error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const createCalendarEvent = async () => {
    const event = {
      summary: eventName,
      description: eventDescription,
      start: { dateTime: start.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      end: { dateTime: end.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    };

    await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.provider_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then(response => response.json())
      .then(data => {
        alert("Event created! Check your Google Calendar.");
        console.log(data);
      })
      .catch(error => console.error("Error creating calendar event:", error));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full">
        {session ? (
          <div>
            <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-6">Welcome, {session.user.email}</h2>
            
            <div className="mb-4">
              <label htmlFor="start-time" className="block text-lg font-medium text-gray-700 mb-2">Start Time</label>
              <DatePicker
                selected={start}
                onChange={(date) => setStart(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="end-time" className="block text-lg font-medium text-gray-700 mb-2">End Time</label>
              <DatePicker
                selected={end}
                onChange={(date) => setEnd(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div className="mb-4">
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={createCalendarEvent}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105"
              >
                Create Calendar Event
              </button>
              <button
                onClick={signOut}
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300 ease-in-out"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <button
              onClick={googleSignIn}
              className="bg-red-500 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Sign In with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GoogleCalendar;
