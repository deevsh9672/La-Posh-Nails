import React from 'react';

const statusStyles = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Rescheduled: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Completed: 'bg-blue-50 text-blue-700 border-blue-200',
  Cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  'No-show': 'bg-gray-50 text-gray-700 border-gray-200',
  New: 'bg-amber-50 text-amber-700 border-amber-200',
  Contacted: 'bg-blue-50 text-blue-700 border-blue-200',
  Enrolled: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Closed: 'bg-gray-50 text-gray-700 border-gray-200',
};

export const StatusBadge = ({ status }) => {
  const style = statusStyles[status] || 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70"></span>
      {status}
    </span>
  );
};

export default StatusBadge;
