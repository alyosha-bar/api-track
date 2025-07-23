

const Metrics = (
    { totalReq, errorRate, avgLatency }
) => {
    return ( 
        <>
            <div className="w-full border rounded-md border-gray-300 p-4 flex justify-around divide-x divide-gray-300 bg-white">
                {/* Total Requests */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    {/* {totalreq && ( */}
                    <>
                        <h5 className="text-green-600 text-sm">Total Requests:</h5>
                        <h3 className="text-green-600 text-3xl p-2 self-center">
                        { totalReq }
                        <div className="text-green-600 text-xs">requests in ... </div>
                        </h3>
                    </>
                    {/* )} */}
                </div>

                {/* Error Rate */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    {/* {errorRate !== null && errorRate !== undefined && !isNaN(errorRate) && ( */}
                    <>
                        <h5 className="text-red-600 text-sm">Error Rate:</h5>
                        <h3 className="text-red-600 text-3xl p-2 self-center">
                        {errorRate}%
                        <div className="text-red-600 text-xs">in ... </div>
                        </h3>
                    </>
                    {/* )} */}
                </div>

                {/* Avg Latency */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    <h5 className="text-black text-sm">Avg Latency:</h5>
                    <h3 className="text-black text-3xl p-2 self-center">
                    {avgLatency} ms
                    <div className="text-xs">per request in ... </div>
                    </h3>
                </div>
                
                {/* Avg Latency */}
                <div className="flex-1 px-4 flex flex-col justify-center">
                    <h5 className="text-black text-sm">Avg Latency:</h5>
                    <h3 className="text-black text-3xl p-2 self-center">
                    {avgLatency} ms
                    <div className="text-xs">per request in ... </div>
                    </h3>
                </div>
            </div>
        </>
    );
}
 
export default Metrics;