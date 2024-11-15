import React from 'react';

const VendorCard = ({ vendor, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{vendor.vendorCompanyName}</h3>
      <div className="space-y-2 text-gray-600">
        <p><span className="font-medium">Service:</span> {vendor.vendorServiceType}</p>
        <p><span className="font-medium">Contact:</span> {vendor.vendorName}</p>
        <p><span className="font-medium">Phone:</span> {vendor.vendorPhone}</p>
        <p><span className="font-medium">Email:</span> {vendor.vendorEmail}</p>
        <p><span className="font-medium">Cost:</span> ${vendor.vendorAmount}</p>
        <p>
          <span className="font-medium">Status:</span>
          <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
            vendor.vendorPaymentStatus === 'Completed' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {vendor.vendorPaymentStatus}
          </span>
        </p>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={onEdit}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default VendorCard;