import { useNavigate } from "react-router-dom";
import Pricing from "../components/landing/Pricing";
import Tech from "../components/landing/Tech";
import Footer from "../components/landing/Footer";

const Landing = () => {

    const navigate = useNavigate()

    return ( 
        <div className="">
            <div className="hero p-36 flex items-center h-3/4 justify-around bg-cyan-200">
                <div className="title-area w-3/5">
                    <h5 className="text-black text-xl font-sans"> Receive crucial analytics into your API usage. </h5>
                    <h1 className="text-8xl font-sans font-bold"> TRACK YOUR API USAGE. </h1>
                    <h3 className="text-black text-5xl mt-8"> NEVER OVERPAY. </h3>
                </div>
                <div className="call-to-action p-10 w-2/5 flex flex-col items-center justify-center">
                    <p className="text-black max-w-72"> API-Dev will track and analyse your 3rd party API usage and prevent you from overpaying your plan.</p>
                    <button className="bg-blue-500 text-white p-4 m-6 rounded-lg w-2/5 min-w-36 hover:bg-blue-600 transition duration-300" onClick={() => {
                        
                    }}> Start Tracking </button>
                </div>
                
            </div>

            <div className="w-full overflow-hidden leading-none bg-cyan-200 ">
                <svg
                className="block w-full h-32"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                >
                <path
                    fill="#ffffff"
                    fillOpacity="1"
                    d="M0,96L48,122.7C96,149,192,203,288,192C384,181,480,107,576,80C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
                </svg>
            </div>
            <Tech />
            <div className="w-full overflow-hidden leading-none bg-white ">
                <svg
                className="block w-full h-32"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                >
                <path
                    fill="#22C55E9A"
                    fillOpacity="1"
                    d="M0,96L48,122.7C96,149,192,203,288,192C384,181,480,107,576,80C672,53,768,75,864,90.7C960,107,1056,117,1152,106.7C1248,96,1344,64,1392,48L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                ></path>
                </svg>
            </div>

            <Pricing/>

            <Footer />

        </div>
    );
}
 
export default Landing;