import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles.css';  // Tailwind CSS
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

// Supabase setup with environment variables
const supabase = createClient(
  "https://fyzztijxyglusfsjnxoe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5enp0aWp4eWdsdXNmc2pueG9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0OTgwNjEsImV4cCI6MjA0NzA3NDA2MX0.iB1sof94q1Ua8wXaZJEKpWi62eFxhRsuJ1FMk6Or8tA"
);
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_KEY);

// Using createRoot to render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
