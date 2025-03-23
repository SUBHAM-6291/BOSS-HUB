import React from 'react';

const UserManagement = () => {
  return (
    <div className="container mx-auto p-4 bg-black min-h-screen">
      <div className="bg-gray-900 shadow-md rounded-lg p-6 border border-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-white">User Management</h2>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              {/* Sample Row */}
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  John Doe
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  john@example.com
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  Admin
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-blue-400 hover:text-blue-300 mr-2">
                    Edit
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;