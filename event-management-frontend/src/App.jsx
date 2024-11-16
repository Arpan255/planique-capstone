import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import CreateEvent from './components/CreateEvent';
import ViewEvents from './components/ViewEvents';
import EventDetails from './components/EventDetails';
import GoogleCalendar from './components/GoogleCalendar'; 
import ViewVendors from './components/ViewVendors';
import ViewVenue from './components/ViewVenue';
import ViewGuests from './components/ViewGuests';
import ViewExpenses from './components/ViewExpenses';
import Tutorial from './components/Tutorial';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/view-events" element={<ViewEvents />} />
        <Route path="/event-details/:eventId" element={<EventDetails />} />
        <Route path="/google-calendar" element={<GoogleCalendar />} />
        <Route path="/viewvendors/:eventId" element={<ViewVendors />} />
        <Route path="/viewvenue/:eventId" element={<ViewVenue />} />
        <Route path="/viewguests/:eventId" element={<ViewGuests />} />
        <Route path="/viewexpenses/:eventId" element={<ViewExpenses />} />
        <Route path="/tutorial" element={<Tutorial />} />
      </Routes>
    </Router>
  );
}

export default App;
