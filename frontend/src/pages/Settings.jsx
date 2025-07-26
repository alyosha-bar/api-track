import { useParams } from "react-router-dom";


const Settings = () => {

    const { id } = useParams();

    return ( 
        <div className="px-64 p-8">
            <div className="flex justify-between">
                <button className="px-3 py-1 rounded bg-gray-200"> Back to Dashboard </button>
                <h2 className="text-2xl"> API NAME  </h2>
            </div>
            <div className="py-10">
                <ul>
                    <li> Change Basic Info </li>
                    <li> Refresh / Check User Token </li>
                    <li> Refresh / Check API Token </li>
                </ul>
            </div>
        </div>
    );
}
 
export default Settings;