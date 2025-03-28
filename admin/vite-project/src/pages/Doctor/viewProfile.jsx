import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserProfileById } from "../../actionDoctor";
import { Plus, FileText, Download, Eye, Trash2 } from "lucide-react";

const ViewProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [alignment, setAlignment] = useState("documents");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  const cToken = localStorage.getItem("cToken");
  const dToken = localStorage.getItem("dToken");

  useEffect(() => {
    if (userId) {
      loadUserProfile();
      fetchPdfFiles();
    }
  }, [userId]);

  const fetchPdfFiles = async () => {
    try {
      const result = await axios.post("http://localhost:4000/get-files", { userId });
      setPdfFiles(result.data.data);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
    }
  };
  

  const loadUserProfile = async () => {
    try {
      const data = await getUserProfileById(userId);
      if (data.success) {
        setProfile(data.userData);
      } else {
        setErrorMessage("Failed to fetch user profile.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (dToken) {
      navigate(`/CaretakerList/${userId}`);
    } else if (cToken) {
      navigate(`/bio/${userId}`);
    }
  };

  const submitPdf = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("userId",userId)
    
    try {
      const result = await axios.post("http://localhost:4000/upload-files", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result.data.status === "ok") {
        //("Uploaded Successfully!");
        fetchPdfFiles();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white w-full max-w-3xl p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Patient Profile</h2>
        {loading ? (
          <p className="text-gray-600">Loading profile...</p>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : profile ? (
          <div>
            <img
              src={profile.image || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 border"
            />
            <p className="text-lg font-medium">{profile.name || "No Name Available"}</p>
            <p className="text-gray-500">{profile.caretaker || "No Caretaker Assigned"}</p>

            {(dToken || cToken) && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 mb-3"
                onClick={handleButtonClick}
              >
                {dToken ? "Add Caretaker" : "View BIO"}
              </button>
            )}

            <div className="mt-4">
              <button
                className={`mr-2 px-4 py-2 rounded ${alignment === "documents" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setAlignment("documents")}
              >
                Progress Track
              </button>
              <button
                className={`px-4 py-2 rounded ${alignment === "Prescription" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                onClick={() => setAlignment("Prescription")}
              >
                Prescription
              </button>
            </div>

            <div className="mt-6 p-4 border rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-2">Uploaded PDFs</h3>
              {pdfFiles.length === 0 ? (
                <p className="text-gray-500">No PDFs found.</p>
              ) : (
                pdfFiles.map((pdf) => (
                  <div key={pdf.id} className="flex items-center justify-between py-2 border-b">
                    <p>{pdf.title}</p>
                    <div className="flex gap-2">
                      <button className="text-blue-500" onClick={() => window.open(`http://localhost:4000/files/${pdf.pdf}`)}>
                        <Eye size={20} />
                      </button>
                      <a href={`http://localhost:4000/files/${pdf.pdf}`} download className="text-green-500">
                        <Download size={20} />
                      </a>
                      <button className="text-red-500" onClick={() => console.log("Delete PDF", pdf.id)}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form className="mt-6 p-4 border rounded-lg" onSubmit={submitPdf}>
              <h4 className="text-lg font-bold">Upload PDF</h4>
              <input type="text" className="w-full p-2 border rounded mt-2" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
              <input type="file" className="w-full p-2 border rounded mt-2" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} required />
              <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit</button>
            </form>
          </div>
        ) : (
          <p className="text-gray-500">Profile not found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewProfile;