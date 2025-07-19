import React from 'react';
import { useNavigate } from 'react-router-dom';

const PricingCard = ({ title, price, features, buttonText, isPopular, comingSoon }) => {

    const navigate = useNavigate()
    
    const startAcc = () => {

        console.log(buttonText)

        if (buttonText === "Start Free") {
            navigate('/signup')
        } else {
            alert('Redirect to stripe payment or smth')
        }
    }
 
    return (
        <div className={`border-2 rounded-lg p-16 m-6 shadow-2xl transition duration-300 ease-in-out ${
        isPopular ? 'border-blue-500 bg-blue-50 shadow-2xl shadow-blue-400' : 'border-gray-400 bg-blue-200'
        }`}>
        {isPopular && (
            <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs mb-4">
            Most Popular
            </span>
        )}
        {comingSoon && (
            <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs mb-4">
            Coming Soon
            </span>
        )}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-4xl font-extrabold mb-4">
            ${price} <span className="text-lg font-medium">/month</span>
        </p>
        <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
            <li key={index} className="text-gray-700 flex items-center">
                <svg
                className="w-5 h-5 text-blue-500 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                ></path>
                </svg>
                {feature}
            </li>
            ))}
        </ul>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition duration-300" onClick={startAcc}>
            {buttonText}
        </button>
        </div>
    );
};

export default PricingCard