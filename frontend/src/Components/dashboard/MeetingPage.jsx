import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const MeetingPage = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(true);

  useEffect(() => {
    socket.emit("join_room", roomId);

    // Listen for incoming messages
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    // Clean up socket listeners on component unmount
    return () => {
      socket.off("receive_message");
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const data = { message, room: roomId };
    socket.emit("send_message", data); // Send message to the server
    setMessages((prevMessages) => [...prevMessages, message]); // Add the sent message to the list
    setMessage(""); // Clear the input field
  };

  const copyRoomIdToClipboard = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      alert('Room ID copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const toggleChatVisibility = () => {
    setIsChatVisible(prevState => !prevState);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-base sm:text-lg font-bold">Room: {roomId}</h1>
          <button
            onClick={copyRoomIdToClipboard}
            className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
          >
            Copy Room ID
          </button>
        </div>
        <button
          onClick={toggleChatVisibility}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 text-sm"
        >
          {isChatVisible ? "Hide Chat" : "Show Chat"}
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Video Section */}
        <div className="flex-1 p-4 lg:w-2/3 transition-all">
          <div className="bg-black h-[300px] sm:h-[400px] lg:h-full flex items-center justify-center rounded-lg shadow-md">
            <p className="text-white text-sm sm:text-base">
              Video Section (WebRTC streams go here)
            </p>
          </div>
        </div>

        {/* Chat Section */}
        {isChatVisible && (
          <div className="w-full lg:w-1/3 bg-white flex flex-col border-t lg:border-t-0 lg:border-l shadow-md">
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <h2 className="text-lg font-bold mb-2">Live Chat</h2>
              <div className="space-y-2">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-200 p-2 rounded text-sm sm:text-base"
                  >
                    {msg}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t flex">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border p-2 text-sm sm:text-base rounded-l focus:outline-none"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 text-sm sm:text-base"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>

      {/*Controls */}
      <footer className="bg-white p-4 border-t flex justify-center flex-wrap gap-4">
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm sm:text-base">
          Leave Meeting
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base">
          Mute
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base">
          Start/Stop Video
        </button>
      </footer>
    </div>
  );
};

export default MeetingPage;
