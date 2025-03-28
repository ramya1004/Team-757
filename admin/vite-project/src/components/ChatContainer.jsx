import React, { useEffect, useRef } from "react";
import { useChatStore } from "../stores/useChatStore";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, users } = useChatStore();
  const messageEndRef = useRef(null);

  // ✅ Prevent crashing when `selectedUser` is nulla
  useEffect(() => {
    if (selectedUser?._id) {
      console.log("Fetching messages for:", selectedUser._id);
      getMessages(selectedUser._id);
    }
  }, [selectedUser, getMessages]);

  // ✅ Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ✅ Show loading UI if messages are being fetched
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // ✅ Ensure `messages` exists to avoid crashes
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.length > 0 ? (
          messages.map((message) => {
            const isSentByCurrentUser = message.senderId === users?._id; // ✅ Corrected sender check

            return (
              <div key={message._id} className={`chat ${isSentByCurrentUser ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                  <div className="w-10 h-12 rounded-full overflow-hidden border border-gray-300">
                    <img
                      src={isSentByCurrentUser ? (users?.image || "/avatar.png") : (selectedUser?.image || "/avatar.png")}
                      alt="profile pic"
                    />
                  </div>
                </div>
                <div className="chat-bubble flex flex-col">
                  {message.image && (
                    <img src={message.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">No messages yet</div>
        )}
        <div ref={messageEndRef}></div>
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
