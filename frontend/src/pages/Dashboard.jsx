import { useParams } from "react-router-dom";


const Dashboard = () => {
    
    const { id } = useParams()
    
    
    return ( 
        <>
            API: {id}
        </>
    );
}
 
export default Dashboard;