import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/registration/Modal';
import { useState } from 'react';
import { API_BASE } from "../api/config";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from 'react';

import { faGrip, faGripLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apiData, setApiData] = useState([])
    const { getToken } = useAuth();
    const [viewMode, setViewMode] = useState('grid');

    // fetch API data based on USERID --> use CLERK ID
    const fetchAllAPIs = async () => {

        const token = await getToken({ template: 'IDToken' });

        const response = await fetch(`${API_BASE}/api/core/all`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Failed to get APIs")
        }

        const data = await response.json()
        setApiData(data)
    }

    // change to REACT QUERY
    useEffect(() => {
        fetchAllAPIs()
    }, [])

    // Future --> Filter by Project 

    // merge with other function
    const registerAPI = async () => {

        const token = await getToken({ template: 'IDToken' });

        console.log("Token:", token);

        const response = await fetch(`${API_BASE}/api/core/register`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const data = await response.json()
        console.log(data)
    }

    const handleRegisterApiClick = () => {
        setIsModalOpen(!isModalOpen)
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmitFormInModal = async (formData) => {
        const token = await getToken({ template: 'IDToken' });

        try {
            // Simulate an API call with a delay
            const response = await fetch(`${API_BASE}/api/core/register`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                return {
                    error: true,
                    message: "Failed to register API - try again :("
                }
            }

            // Simulate a successful response
            const data = await response.json()

            setApiData(prevApis => [...prevApis, data.newApi])

            const responseData = {
                error: false,
                message: "Successfully registered API",
                apiToken: data.newApi.api_token
            }

            return responseData;

        } catch (error) {
            console.error('API error:', error);
            // Simulate an error response
            return {
                message: 'An error occurred during processing.',
                status: 'error'
            };
        }
    };

    return (
        <div className="container mx-auto p-8">
            
            <div className="w-full flex items-center justify-between mb-8 px-2 py-3 bg-white shadow-sm rounded-lg">
                {/* Left side: Title */}
                <h1 className="text-3xl font-bold text-gray-800 flex-grow">Your Registered APIs</h1> {/* Adjusted for flex-grow */}

                {/* Right side: Toggle Buttons */}
                <div className="flex items-center space-x-3">
                {/* Grid Button */}
                <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200
                    ${viewMode === 'grid'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-pressed={viewMode === 'grid'}
                    aria-label="Switch to Grid View"
                >
                    <FontAwesomeIcon icon={faGrip}/>
                </button>

                {/* Rows Button */}
                <button
                    onClick={() => setViewMode('rows')}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200
                    ${viewMode === 'rows'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                    aria-pressed={viewMode === 'rows'}
                    aria-label="Switch to List View"
                >
                    <FontAwesomeIcon icon={faGripLines}/>
                </button>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {apiData.map((api) => (
                    <Link to={`/dashboard/${api.id}`} key={api.id} className="block">
                        <div
                            className="
                                bg-white rounded-lg shadow-md p-6 flex flex-col
                                min-h-[250px]
                                transition-all duration-300 ease-in-out
                                hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]
                                cursor-pointer
                            "
                        >
                            <div className="flex-grow">
                                <h2 className="text-2xl font-semibold mb-3 text-blue-600">{api.title}</h2>
                                <p className="text-gray-600 mb-4">{api.description}</p>
                                {/* Display the project name */}
                                <p className="text-sm text-gray-500 italic mb-2">Project: {api.project_name}</p> {/* <-- Added Project Display */}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500 font-medium"> Some Mega Stat </p>
                            </div>
                        </div>
                    </Link>
                ))}

                {/* Button to Register New API */}
                <button
                    onClick={handleRegisterApiClick}
                    className="
                        bg-gray-100
                        border-2 border-gray-300
                        rounded-lg p-6 flex flex-col items-center justify-center
                        min-h-[250px]
                        transition-all duration-300 ease-in-out
                        hover:bg-gray-200
                        hover:shadow-md
                        hover:-translate-y-1
                        cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                    "
                >
                    <h2 className="text-4xl font-bold mb-3 text-gray-700">+</h2>
                    <p className="text-lg font-semibold text-gray-700">Register New API</p>
                </button>

                      <Modal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onSubmitForm={handleSubmitFormInModal}
                            // initialContent={modalContent} // Pass initial content if needed
                        />

            </div>
        </div>
    );
};

export default Home;