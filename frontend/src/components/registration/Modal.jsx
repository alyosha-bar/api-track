import React, { useState } from 'react';
import { useEffect } from 'react';

function Modal({ isOpen, onClose, onSubmitForm }) {
    const [formState, setFormState] = useState('form'); // 'form', 'loading', 'result'
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [resultMessage, setResultMessage] = useState('');

    useEffect(() => {
        // When the modal opens (isOpen becomes true), reset all internal states
        if (isOpen) {
        setFormState('form');
        setFormData({ name: '', email: '' });
        setResultMessage('');
        }
        // We only want this effect to run when isOpen changes.
        // If isOpen is false, we don't need to do anything.
    }, [isOpen]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event) => {
    event.preventDefault();
    setFormState('loading'); // Switch to loading state

    try {
        const response = await onSubmitForm(formData); // Call parent's submit handler

        if (response) {
            setResultMessage(response.message);
            setFormState('result'); // Switch to result state
        } else {
            setResultMessage('An unexpected error occurred.');
            setFormState('result');
        }
    } catch (error) {
            console.error('Error in modal submit handler:', error);
            setResultMessage('An error occurred while submitting.');
            setFormState('result');
        }
    };

    if (!isOpen) {
        return null;
    }

  return (
    // Modal Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
      {/* Modal Content Box */}
      <div className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {formState === 'form' && (
          <>
            <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">Enter Your Details</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </form>
          </>
        )}

        {formState === 'loading' && (
          <div className="flex flex-col items-center justify-center py-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Processing...</h2>
            <p className="text-gray-600 mb-6">Please wait while we process your request.</p>
            {/* You could add a spinner component here */}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}

        {formState === 'result' && (
          <div className="flex flex-col items-center justify-center py-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Submission Result</h2>
            <p className={`text-lg mb-6 ${resultMessage.includes('error') ? 'text-red-500' : 'text-green-600'}`}>
              {resultMessage}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;