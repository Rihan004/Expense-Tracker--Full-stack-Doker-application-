import React from "react";

function Navbar() {
  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      {/* Company Name */}
      <div className="text-2xl font-bold">
        LetsTrackIt
      </div>

      {/* Profile Logo */}
      <div>
        <img
          src="https://i.pravatar.cc/40" // placeholder avatar
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
    </nav>
  );
}

export default Navbar;
