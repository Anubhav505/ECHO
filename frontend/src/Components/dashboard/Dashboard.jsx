import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  const handleStartNow = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/create-room");
      const roomId = response.data.roomId;
      navigate(`/meeting/${roomId}`);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  const handleJoinRoom = () => {
    if (roomCode.trim()) {
      navigate(`/meeting/${roomCode}`);
    } else {
      alert("Please enter a valid room code.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-1 container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome to Your Zoom Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Start a Meeting */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Start a Meeting
            </h2>
            <p className="text-gray-600 mt-2">
              Host a new video call instantly.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleStartNow}
            >
              Start Now
            </button>
          </div>

          {/* Join a Room */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Join a Meeting
            </h2>
            <p className="text-gray-600 mt-2">
              Enter a room code to join an ongoing meeting.
            </p>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => setIsJoinModalOpen(true)}
            >
              Join Room
            </button>
          </div>
        </div>
      </div>

      {/* Join Room Modal */}
      {isJoinModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Join a Room
            </h2>
            <input
              type="text"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="w-full border p-2 rounded text-sm sm:text-base focus:outline-none mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setIsJoinModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleJoinRoom}
              >
                Join
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
