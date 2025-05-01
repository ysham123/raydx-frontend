import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">RayDx</h1>
        <div className="space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`
            }
          >
            Upload
          </NavLink>
          <NavLink
            to="/result"
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`
            }
          >
            Result
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`
            }
          >
            History
          </NavLink>
          <NavLink
            to="/process"
            className={({ isActive }) =>
              `text-lg font-medium ${isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-500'}`
            }
          >
            Process
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;