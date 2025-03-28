import { createContext, useState } from "react";

export const CareTakerContext = createContext();

const CareTakerContextProvider = (props) => {
  const backendUrl = "http://localhost:4000/api";

  const [cToken, setCToken] = useState(localStorage.getItem("cToken") || "");
  const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
  const [appointments, setAppointments] = useState([]);
  const [caretakers, setCaretakers] = useState([]);

  const getUserProfileById = async (userId) => {
    try {
      console.log("🔎 Fetching User Profile for:", userId);
      const response = await fetch(`${backendUrl}/user/get-profileBYdoctor`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const responseData = await response.json();
      console.log("📢 User Profile Response:", responseData);

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.error || "Failed to fetch user profile");
      }

      return responseData.user;
    } catch (error) {
      console.error("❌ Error fetching user profile:", error);
      return null;
    }
  };

  const getPatientList = async (cId) => {
    try {
      console.log("🔎 Fetching Patient List for Caretaker ID:", cId);
      const response = await fetch(
        `${backendUrl}/careTaker/allPatientsWithCaretaker`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cId }),
        }
      );

      const responseData = await response.json();
      console.log("📢 Patient List Response:", responseData);

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.error || "Failed to fetch patients.");
      }

      return responseData.newCareTakerWithPatient || [];
    } catch (error) {
      console.error("❌ Error fetching patients:", error);
      return [];
    }
  };

  // Get caretaker list
  const careTakerlist = async (cId) => {
    try {
      console.log("🔎 Fetching Caretaker List for ID:", cId);
      const response = await fetch(`${backendUrl}/careTaker/careTakerList`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cId }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch caretakers.");
      }

      const responseData = await response.json();

      if (!responseData.success) {
        throw new Error(responseData.error || "Failed to fetch caretakers.");
      }

      setCaretakers(responseData.caretakers);
      return responseData.caretakers; // Return fetched data
    } catch (error) {
      console.error("❌ Error fetching caretakers:", error);
      return [];
    }
  };

  return (
    <CareTakerContext.Provider
      value={{
        cToken,
        setCToken,
        appointments,
        setAppointments,
        caretakers,
        careTakerlist,
        getUserProfileById,
        getPatientList,
      }}
    >
      {props.children}
    </CareTakerContext.Provider>
  );
};

export default CareTakerContextProvider;
