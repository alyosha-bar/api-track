import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    // fetch API data based on USERID --> use CLERK ID


    // Future --> Filter by Project 

    // Sample API data with the new 'project' field
    const apiData = [
        {
            id: 1,
            title: "Weather API",
            description: "Get real-time weather data for any location worldwide.",
            statistic: "10M+ Requests/Day",
            project: "Data Analytics Platform", // New field
            link: "/weather"
        },
        {
            id: 2,
            title: "Currency Converter API",
            description: "Convert currencies with up-to-date exchange rates.",
            statistic: "5M+ Requests/Day",
            project: "Financial Dashboard", // New field
            link: "/currency"
        },
        {
            id: 3,
            title: "Movie Database API",
            description: "Access a vast collection of movie information, cast, and ratings.",
            statistic: "8M+ Requests/Day",
            project: "Media Catalog", // New field
            link: "/movies"
        },
        {
            id: 4,
            title: "News Feed API",
            description: "Stay updated with the latest news from various sources.",
            statistic: "12M+ Requests/Day",
            project: "Content Aggregator", // New field
            link: "/news"
        }
    ];


    const handleRegisterApiClick = () => {
        alert("Launching New API Registration Flow!");
        // In a real app, this would navigate to a registration form or open a modal
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold text-center mb-12 text-gray-800"> Your Registered APIs</h1>

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
                                <p className="text-sm text-gray-500 italic mb-2">Project: {api.project}</p> {/* <-- Added Project Display */}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-500 font-medium">{api.statistic}</p>
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
            </div>
        </div>
    );
};

export default Home;