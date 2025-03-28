import React, { useEffect } from "react";
import { useChatStore } from "../stores/useChatStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const ChatSidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  console.log("Users Data:", users); // Debugging
  console.log("Selected User (Before Click):", selectedUser);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {users.length > 0 ? (
          users.map((user) => (
            <button
              key={user.userData?._id}
              onClick={() => {
                if (!user.userData || !user.userData._id) {
                  //("Error: User data is missing!");
                  return;
                }

                setSelectedUser(user.userData);
                console.log("Setting selected user:", user.userData);

                // Delay // to allow React to update state
                setTimeout(() => {
                  //(`Selected User Data: ${JSON.stringify(user.userData, null, 2)}`);
                }, 100);
              }}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors 
                ${selectedUser?._id === user.userData?._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.userData?.image || "/avatar.png"}
                  alt={user.userData?.name || "User"}
                  className="size-12 object-cover rounded-full"
                />
              </div>

              {/* User info - only visible on larger screens */}
              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.userData?.name || "Unknown User"}</div>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
