import CodeBlock from "../components/docs/CodeBlock";
import { Link } from 'react-router-dom'

const Docs = () => {
  return (
    <div className="flex px-4 lg:px-10 py-10 divide-x divide-gray-300 min-h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-64 top-24 h-fit pr-6 hidden lg:block">
        <ul className="space-y-4 text-sm font-medium text-gray-700">
            <li>
                <a href="#welcome" className="hover:text-blue-600 transition-colors">
                Welcome to API-Track
                </a>
            </li>
            <li>
                <a href="#getting-started" className="hover:text-blue-600 transition-colors">
                Getting Started
                </a>
            </li>
            <li>
                <a href="#embed-script" className="hover:text-blue-600 transition-colors">
                Embed Script
                </a>
            </li>
            {/* <li>
                <a href="#metrics" className="hover:text-blue-600 transition-colors">
                Tracking Metrics
                </a>
            </li> */}
            <li>
                <a href="#support" className="hover:text-blue-600 transition-colors">
                Getting Support
                </a>
            </li>
            {/* <li>
                <a href="#support" className="hover:text-blue-600 transition-colors">
                Future Features
                </a>
            </li> */}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl px-10">
        <section className="py-6">
            <h1 id="getting-started" className="text-3xl font-bold mb-2"> Welcome </h1>
            <p className="mb-4 text-gray-600">
                API-Track is a platform which allows developers to view important 3rd party API analytics and stay aware of how APIs are used in your web applications. API-Track offers to sync all your different projects and the APIs used within them into one platform where you can analyse patterns. 
            </p>
        </section>

        <section className="py-10">
            <h2 id="getting-started" className="text-3xl font-bold mb-6 text-gray-900">Getting Started</h2>

            <p className="mb-4 text-gray-600">
                To begin using API-Track, head over to the <Link className="text-blue-700" to={'/home'}>Home</Link> page and click <strong>REGISTER A NEW API</strong>.
            </p>

            <p className="mb-4 text-gray-600">
                Fill out the form with details about your API, including the Title, Description, Project Name, and Base URL. Ensure that the Base URL is configured correctly - this is what the system uses to track requests.
            </p>

            <p className="mb-4 text-gray-600">
                After submitting the form, you’ll receive an API Token. This token will be used as shown below to track the URL.
            </p>

            <p className="mb-4 text-gray-600">
                Lastly, visit the settings dashboard to access your User Token and embed the tracking script as instructed.
            </p>
        </section>



        <section className="py-6">
            <h2 id="embed-script" className="text-2xl font-bold mb-2">Embed Script</h2>
            <p className="mb-4 text-gray-600">
            Place the following script in your <code>&lt;head&gt;</code> or before your closing <code>&lt;/body&gt;</code> tag:
            </p>

            <CodeBlock code={`<script 
    src="https://api-track.pages.dev/tracking.js"
    data-user="<YOUR_USER>"
    data-apitoken="<YOUR_TOKEN>"
    data-base="<YOUR_API_URL>"
    async>
</script>`} />

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-md my-4">
                <strong className="text-yellow-800 block mb-1">Note:</strong>
                <span className="text-yellow-700">
                    Replace <code>YOUR_USER</code>, <code>YOUR_TOKEN</code> and <code>YOUR_API_URL</code> with actual values from your settings dashboard.
                </span>
            </div>
            <div className="border-l-4 border-red-400 bg-red-50 p-4 rounded-md my-4">
                <strong className="text-red-800 block mb-1">Important:</strong>
                <span className="text-red-700">
                    Use environment variables for <code>YOUR_USER</code>, <code>YOUR_TOKEN</code> and <code>YOUR_API_URL</code> to stay secure.
                </span>
            </div>
        </section>

        {/* <section className="py-6">
            <h2 id="metrics" className="text-2xl font-bold mb-2"> Tracking Metrics </h2>
            <p>

            </p>
        </section> */}

        <section className="py-10">
            <h2 id="support" className="text-3xl font-bold mb-6 text-gray-900">Getting Support</h2>

            <p className="mb-4 text-gray-600">
                For support or inquiries, feel free to reach out via email at <strong>apitrack.dev@gmail.com</strong>. 
            </p>
            <p className="mb-4 text-gray-600">
                You’re also welcome to submit the <a className="text-blue-600" href="https://forms.gle/9e8GzvDSTBkkv9kGA">feedback form</a> as many times as needed to report issues or suggest new features.
            </p>
        </section>


      </main>
    </div>
  );
};

export default Docs;
