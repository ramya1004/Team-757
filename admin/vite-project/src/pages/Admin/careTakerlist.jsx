import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CareTakerContext } from "../../context/CareTakerContext";

const CareTakerList = () => {
  const { getCareTakerList, addCareTaker } = useContext(CareTakerContext);
  const [careTakers, setCareTakers] = useState([]);
  const [msg, setMsg] = useState("");
  const cId = localStorage.getItem("cToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (cId) fetchCareTakerList(cId);
  }, [cId]);

  const fetchCareTakerList = async (cId) => {
    try {
      setMsg("Loading...");
      const response = await getCareTakerList(cId);
      
      if (!response || !response.caretakers || response.caretakers.length === 0) {
        setMsg("No caretakers found.");
        return;
      }
      
      setCareTakers(response.caretakers);
      setMsg("");
    } catch (error) {
      console.error("❌ Error fetching caretaker list:", error);
      setMsg("Error fetching data.");
    }
  };

  const handleAssign = async (docId, userId) => {
    try {
      const response = await addCareTaker({ cId, docId, userId });
      //(response.message || "Caretaker assigned successfully!");
    } catch (error) {
      console.error("❌ Error assigning caretaker:", error);
      //("Failed to assign caretaker.");
    }
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Caretakers</p>
      {msg && careTakers.length === 0 && <p className="text-red-500">{msg}</p>}
      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        {careTakers.length > 0 && (
          <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr] gap-1 py-3 px-6 border-b">
            <p>#</p>
            <p>Profile</p>
            <p>Degree & Experience</p>
            <p>Action</p>
          </div>
        )}
        {careTakers.length > 0 ? (
          careTakers.map((item, index) => (
            <div
              className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
              key={index}
            >
              <p className="max-sm:hidden">{index + 1}</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.image || "/default.jpg"}
                  className="w-10 h-10 rounded-full border"
                  alt="Caretaker"
                />
                <p>{item.name}</p>
              </div>
              <div>
                <p className="font-medium">{item.degree || "N/A"}</p>
                <p className="text-xs text-gray-500">{item.experience} years experience</p>
              </div>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => handleAssign(item.docId, item.userId)}
              >
                Assign
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No caretakers available.</p>
        )}
      </div>
    </div>
  );
};

export default CareTakerList;
