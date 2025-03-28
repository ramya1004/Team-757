import { create } from "zustand";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are imported

const BACKEND_URL = "http://localhost:4000/api"; // Correct usage

// Toastify configuration for global usage
export const showToast = (message, type = "error") => {
  toast[type](message, { position: "top-right", autoClose: 3000 });
};

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

  // Fetch users for the chat sidebar
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const dToken = localStorage.getItem("dToken");
      if (!dToken) throw new Error("No authentication token found");

      console.log("Fetching users from API...");
      const res = await fetch(`${BACKEND_URL}/messages/getUsersForSidebar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dToken }),
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      console.log("Fetched users:", data);
      set({ users: data });
    } catch (error) {
      console.error("Error fetching users:", error);
      showToast(error.message || "Failed to fetch users", "error");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // Fetch messages for a specific user
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const dToken = localStorage.getItem("dToken");
      if (!dToken) throw new Error("No authentication token found");

      console.log(`Fetching messages for user ${userId}...`);
      const res = await fetch(`${BACKEND_URL}/messages/getMessages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dToken, userId }),
      });

      if (!res.ok) throw new Error("Failed to load messages");

      const data = await res.json();
      console.log("Fetched messages:", data);
      set({ messages: data });
    } catch (error) {
      console.error("Error fetching messages:", error);
      showToast(error.message || "Failed to load messages", "error");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // Send a message
  sendMessage: async (messageData) => {
    const { messages } = get();
    set({ isSendingMessage: true });

    try {
      console.log("Sending message...", messageData);
      const res = await fetch(`${BACKEND_URL}/messages/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      const data = await res.json();
      console.log("Message sent:", data);
      set({ messages: [...messages, data] });
      showToast("Message sent successfully!", "success");
    } catch (error) {
      console.error("Error sending message:", error);
      showToast(error.message || "Failed to send message", "error");
    } finally {
      set({ isSendingMessage: false });
    }
  },

  // Select a user
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
