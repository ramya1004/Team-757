import { useState } from "react";
import { useChatStore } from "../stores/useChatStore";
import { Send, User } from "lucide-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage, selectedUser } = useChatStore();

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return; // Prevent empty messages

    try {
      await sendMessage({
        text: text.trim(),
        dToken: localStorage.getItem("dToken"),
        receiverId: selectedUser._id,
      });
      setText(""); // Clear input after sending
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full flex items-center gap-3">
      {/* Small Rounded Profile Picture */}
      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
        {selectedUser?.image ? (
          <img
            src={selectedUser.image}
            alt="User"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <User className="text-gray-500" />
          </div>
        )}
      </div>

      {/* Input Field & Send Button */}
      <form onSubmit={handleSendMessage} className="flex items-center w-full gap-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-sm btn-circle bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center"
          disabled={!text.trim()}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
