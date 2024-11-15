import React from 'react';

const VenueCard = ({ venue }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-purple-600">
        <h2 className="text-2xl font-bold text-white">Venue</h2>
      </div>
      <div className="p-6 space-y-3">
        <div className="flex flex-col space-y-1">
          <span className="text-gray-600 font-medium">Name</span>
          <span className="text-gray-800">{venue.name}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-600 font-medium">Address</span>
          <span className="text-gray-800">{venue.address}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-600 font-medium">Owner</span>
          <span className="text-gray-800">{venue.owner}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-600 font-medium">Contact</span>
          <span className="text-gray-800">{venue.phone}</span>
          <span className="text-gray-800">{venue.email}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <span className="text-gray-600 font-medium">Cost</span>
          <span className="text-gray-800">${venue.cost}</span>
        </div>
        {venue.notes && (
          <div className="flex flex-col space-y-1">
            <span className="text-gray-600 font-medium">Notes</span>
            <span className="text-gray-800">{venue.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueCard;