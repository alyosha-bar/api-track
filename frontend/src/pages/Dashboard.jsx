import { useParams } from "react-router-dom";


const Dashboard = () => {
    
    const { id } = useParams()
    
    // fetch analytics and API data

    return ( 
        <>
            API: {id}
        </>
    );
}
 
export default Dashboard;