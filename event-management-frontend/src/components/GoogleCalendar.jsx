import React, { useState } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; 
import { useNavigate } from 'react-router-dom';

function GoogleCalendar() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  if (isLoading) {
    return <div className="text-slate-400">Loading...</div>;
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
    if (!session?.provider_token) {
      alert("Please sign in again to refresh your session.");
      await signOut();
      return;
    }

    const event = {
      summary: eventName,
      description: eventDescription,
      start: { dateTime: start.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
      end: { dateTime: end.toISOString(), timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone },
    };
    try {
      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("Your session has expired. Please sign in again.");
          await signOut();
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert("Event created! Check your Google Calendar.");
      setStart(new Date());
      setEnd(new Date());
      setEventName("");
      setEventDescription("");
    } catch (error) {
      console.error("Error creating calendar event:", error);
      alert("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="w-full">
      {session ? (
        <div className="space-y-3">
          <p className="text-sm text-slate-300">Signed in as {session.user.email}</p>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400">Start</label>
              <DatePicker
                selected={start}
                onChange={(date) => setStart(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-1 text-sm bg-slate-800 border border-slate-600 rounded text-slate-200"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">End</label>
              <DatePicker
                selected={end}
                onChange={(date) => setEnd(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-1 text-sm bg-slate-800 border border-slate-600 rounded text-slate-200"
              />
            </div>
          </div>
          
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="w-full p-1 text-sm bg-slate-800 border border-slate-600 rounded text-slate-200"
          />
          
          <input
            type="text"
            placeholder="Event Description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="w-full p-1 text-sm bg-slate-800 border border-slate-600 rounded text-slate-200"
          />

          <div className="flex justify-between">
            <button
              onClick={createCalendarEvent}
              className="px-3 py-1 text-sm bg-emerald-400 text-slate-900 rounded hover:bg-emerald-500"
            >
              Create Event
            </button>
            <button
              onClick={signOut}
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <button
            onClick={googleSignIn}
            className="px-3 py-1 text-sm bg-emerald-400 text-slate-900 rounded hover:bg-emerald-500"
          >
            Sign In with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default GoogleCalendar;
