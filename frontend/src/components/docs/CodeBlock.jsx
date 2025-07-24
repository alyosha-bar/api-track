import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'

const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-900 text-white text-sm rounded-xl p-4 overflow-x-auto mb-6">
      <pre className="whitespace-pre-wrap"><code>{code}</code></pre>
      <button
        onClick={copy}
        className="absolute top-3 right-3 bg-gray-800 text-gray-300 hover:text-white p-1 rounded-md"
      >
        {copied ? <FontAwesomeIcon icon={faCheck}/> : <FontAwesomeIcon icon={faCopy}/>}
      </button>
    </div>
  );
};


export default CodeBlock;