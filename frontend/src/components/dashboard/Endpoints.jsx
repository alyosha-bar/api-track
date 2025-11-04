import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";


const Endpoints = () => {


    const endpoints = [
        { id: 1, name: '/api/v1/users', method: 'GET', requests: 1200 },
        { id: 2, name: '/api/v1/orders', method: 'POST', requests: 800 },
        { id: 3, name: '/api/v1/products', method: 'GET', requests: 1500 },
        { id: 4, name: '/api/v1/inventory', method: 'PUT', requests: 300 },
        { id: 5, name: '/api/v1/reports', method: 'DELETE', requests: 100 },
    ]


    // order them by requests desc
    // give ability to sort by error rate, requests and latency


    return ( 
        <Card className="w-2/5">
            <CardHeader>
                <CardTitle>Endpoints</CardTitle>
                <CardDescription>List of your API endpoints</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="divide-y divide-gray-100">
                    {endpoints.map((endpoint) => (
                    <div
                        key={endpoint.id}
                        className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
                    >
                        <p className="text-gray-700 font-medium">{endpoint.name}</p>
                        <p className="text-gray-600 font-semibold">
                        {endpoint.requests.toLocaleString()}{" "}
                        <span className="text-xs text-gray-400 font-normal">requests</span>
                        </p>
                    </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
 
export default Endpoints;