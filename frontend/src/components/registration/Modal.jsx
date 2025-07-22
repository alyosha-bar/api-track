import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Modal({ isOpen, onClose, onSubmitForm }) {
    const [formState, setFormState] = useState('form'); // 'form', 'loading', 'result'
    const [formData, setFormData] = useState({
            title: '',
            description: '',
            project_name: '',
            base_url: ''
          });
    const [resultMessage, setResultMessage] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [apiToken, setApiToken] = useState(null)

    const tokenRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
          setFormState('form');
          setFormData({
            title: '',
            description: '',
            project_name: '',
            base_url: ''
          });
          setApiToken('');
          setResultMessage('');
          setCopySuccess('');
        }
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
    setFormState('loading');

    try {
        const response = await onSubmitForm(formData);

        console.log(response)

        if (response.error == true) {
          setResultMessage(response.message)
          setFormState('result')
        } else {
          setResultMessage(response.message)
          setApiToken(response.apiToken)
          setFormState('result')
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

    // --- Copy to Clipboard Functionality ---
    const copyToClipboard = () => {
      if (tokenRef.current) {
        navigator.clipboard.writeText(tokenRef.current.textContent)
          .then(() => {
            setCopySuccess('Copied!');
            // Optionally, clear the "Copied!" message after a few seconds
            setTimeout(() => setCopySuccess(''), 3000);
          })
          .catch(err => {
            setCopySuccess('Failed to copy!');
            console.error('Failed to copy token: ', err);
          });
      }
    };

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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="project_name" className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                  type="text"
                  id="project_name"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="base_url" className="block text-sm font-medium text-gray-700">Base Url</label>
                <input
                  type="text"
                  id="base_url"
                  name="base_url"
                  value={formData.base_url}
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
            <h2 className={`text-2xl mb-4 text-center ${resultMessage.includes('error') ? 'text-red-500' : 'text-green-600'}`}>
              {resultMessage}
            </h2>

            {/* Styled API Token Display */}
            {apiToken && (
              <div className="mt-4 w-full max-w-sm text-center">
                <h3 className="text-md font-semibold text-gray-700 mb-2">Your API Token:</h3>
                <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-gray-50">
                  <span
                    ref={tokenRef}
                    className="text-xs text-gray-700 font-mono truncate ... relative block"
                    title={apiToken}
                  >
                    {apiToken}
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="ml-3 px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-150 ease-in-out whitespace-nowrap"
                  >
                    {copySuccess || 'Copy'}
                  </button>
                </div>
                {copySuccess && (
                  <p className={`text-xs mt-1 ${copySuccess === 'Copied!' ? 'text-green-500' : 'text-red-500'}`}>
                    {copySuccess}
                  </p>
                )}
              </div>
            )}

            <div className="mt-6 p-4 border-t border-gray-200 w-full max-w-sm text-center text-gray-600 text-sm">
              <p className="mb-2">
                Plug the Token into the head of the index.html - Start!
              </p>
              <p>
                Learn more about token at <Link to='/docs/tokens' className="text-blue-600 hover:underline">Docs</Link>
              </p>
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-150 ease-in-out"
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