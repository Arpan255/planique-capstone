import React from 'react';

const GuestCard = ({ guests }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-green-600">
        <h2 className="text-2xl font-bold text-white">Guest List</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {guests.map((guest) => (
            <div 
              key={guest.id} 
              className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800">{guest.name}</p>
                  <p className="text-sm text-gray-600">{guest.email}</p>
                  <p className="text-sm text-gray-600">{guest.phone}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  guest.rsvpStatus === 'Confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : guest.rsvpStatus === 'Declined'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {guest.rsvpStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestCard;