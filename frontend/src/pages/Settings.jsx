import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState } from "react";
import FieldModal from "../components/settings/FieldModal";
import { API_BASE } from "../api/config";
import { useAuth } from "@clerk/clerk-react";

const Settings = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getToken } = useAuth();

    // fetch API info by ID

    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = () => {
        console.log('Submitted:', inputValue);
        setIsOpen(false);
    };


    const userToken = "USER_TOKEN_12345fwaifbpawfapwbfawfobawofbasdaw..."; 
    const apiToken = "API_TOKEN_67890asddwadawofawinfpawoavwoaawaowf...";  

    const userTokenRef = useRef(null);
    const apiTokenRef = useRef(null);

    // Modal which has passed in field and submit function --> called FieldModal

    const handleDelete = async () => {

        // get token
        const token = await getToken({ template: 'IDToken' });

        // call delete API function
        const response = await fetch(`${API_BASE}/api/core/delete/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            console.error('Failed to delete API');
            return;
        }

        const data = await response.json();
        alert(data.message)
        navigate("/home");
    }



    return (
    <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
            <button
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm"
                onClick={() => navigate(-1)}
            >
                ← Back to Dashboard
            </button>
            <h2 className="text-3xl font-bold text-gray-900">API Settings</h2>
            </div>

            {/* Basic Info Section */}
            <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Change Basic Info</h3>
            {["Title", "Description", "Project Name", "Base URL"].map((label) => (
                <div key={label} className="flex items-center gap-4">
                    <p 
                        className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {label}
                    </p>
                    <button 
                        onClick={() => {setIsOpen(true)}}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Change
                    </button>
                    <FieldModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        title={label}
                        field={
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type something..."
                        />
                        }
                        onSubmit={handleSubmit}
                    />
                </div>
            ))}
            </div>

            {/* Token Section */}
            <div className="mt-12 space-y-8">
            {/* User Token */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">User Token</h3>
                <div className="flex items-center gap-4">
                <span
                    ref={userTokenRef}
                    className="text-xs text-gray-700 font-mono truncate bg-gray-100 px-3 py-2 rounded"
                    title={userToken}
                >
                    {userToken}
                </span>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    Reset
                </button>
                </div>
            </div>

            {/* API Token */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">API Token</h3>
                <div className="flex items-center gap-4">
                <span
                    ref={apiTokenRef}
                    className="text-xs text-gray-700 font-mono truncate max-w-md bg-gray-100 px-3 py-2 rounded"
                    title={apiToken}
                >
                    {apiToken}
                </span>
                <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    Reset
                </button>
                </div>
            </div>
        </div>

        {/* Delete Button */}
        <div className="mt-16 text-right">
            <button 
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleDelete}
            >
            Delete Registered API
            </button>
        </div>
    </div>
  );
};

export default Settings;
