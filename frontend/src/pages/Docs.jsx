import CodeBlock from "../components/docs/CodeBlock";


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
            <li>
                <a href="#metrics" className="hover:text-blue-600 transition-colors">
                Tracking Metrics
                </a>
            </li>
            <li>
                <a href="#support" className="hover:text-blue-600 transition-colors">
                Getting Support
                </a>
            </li>
            <li>
                <a href="#support" className="hover:text-blue-600 transition-colors">
                Future Features
                </a>
            </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl px-10">
        <section className="py-6">
            <h1 id="getting-started" className="text-3xl font-bold mb-2"> Welcome </h1>
        </section>

        <section className="py-6">
            <h2 id="getting-started" className="text-2xl font-bold mb-2"> Getting Started </h2>
        </section>


        <section className="py-6">
            <h2 id="embed-script" className="text-2xl font-bold mb-2">Embed Script</h2>
            <p className="mb-4 text-gray-600">
            Place the following script in your <code>&lt;head&gt;</code> or before your closing <code>&lt;/body&gt;</code> tag:
            </p>

            <CodeBlock code={`<script async src="https://cdn.yourtracker.com/tracker.js?user=YOUR_USER&apitoken=YOUR_TOKEN&baseurl=YOUR_API_URL"></script>`} />

            <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4 rounded-md">
            <strong className="text-yellow-800 block mb-1">Note:</strong>
            <span className="text-yellow-700">
                Replace <code>YOUR_USER</code>, <code>YOUR_TOKEN</code> and <code>YOUR_API_URL</code> with actual values from your settings dashboard.
            </span>
            </div>
        </section>

        <section className="py-6">
            <h2 id="metrics" className="text-2xl font-bold mb-2"> Tracking Metrics </h2>
        </section>

        <section className="py-6">
            <h2 id="support" className="text-2xl font-bold mb-2"> Getting Support </h2>
        </section>

      </main>
    </div>
  );
};

export default Docs;
