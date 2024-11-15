import React from 'react';

const DashboardCard = ({ title, children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}
    >
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default DashboardCard;