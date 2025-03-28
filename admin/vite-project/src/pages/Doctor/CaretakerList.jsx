import { useState, useEffect } from "react";
import { careTakerList, addCareTaker } from "../../actions/caretakerAction.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";


const CaretakerView = () => {
    const [caretakers, setCaretakers] = useState([]);
    const navigate = useNavigate();
    const dToken = localStorage.getItem("dToken"); // ✅ Fixed
    const { userId } = useParams();

    useEffect(() => {
        loadCaretakerDetails();
    }, []);

    const loadCaretakerDetails = async () => {
        try {
            const data = await careTakerList();
            if (data.error) {
                console.error(data.error);
            } else {
                setCaretakers(data.caretakers);
            }
        } catch (error) {
            console.error("Error fetching caretakers:", error);
        }
    };
    const handleAssign = async (cId) => { 
        try {
            if (!dToken) {
                //("❌ Missing authentication token.");
                return;
            }
            if (!userId) {
                //("❌ User ID is required.");
                return;
            }
    
            const response = await addCareTaker(cId, dToken, userId); // ✅ Fixed
            //(response.message || "Caretaker assigned successfully!");
        } catch (error) {
            console.error("❌ Error assigning caretaker:", error);
            //("Failed to assign caretaker.");
        }
    };
    
    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold">Caretaker List</h2>
               

                <ul className="bg-base-100 rounded-box shadow-md mt-4">
                    {caretakers.length > 0 ? (
                        caretakers.map((item, index) => (
                            <li key={item._id || index} className="flex items-center p-4 border-b">
                                <img className="size-10 rounded-box" src={item.image} alt={item.name} />
                                <div className="ml-4">
                                    <div>{item.name}</div>
                                    <div className="text-xs uppercase font-semibold opacity-60">
                                        {item.degree}
                                    </div>
                                </div>
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 ml-auto"
                                    onClick={() => handleAssign(item._id, userId)}
                                >
                                    Assign
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No caretakers found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CaretakerView;
