

const Tech = () => {
    return ( 
        <div className="p-16 h-96 flex flex-col justify-center items-center">
            <h1 className="text-black text-3xl pb-10"> Supports the <b className="text-black">Fetch API</b> in: </h1>
            <ul className="tech-stack flex p-6 justify-around items-center w-3/5">
                <li className="p-5 m-4 w-36 border-2 border-blue-300 bg-blue-800 text-white rounded-lg flex items-center justify-center shadow-xl shadow-blue-300">React</li>
                <li className="p-5 m-4 w-36 border-2 border-green-300 bg-green-800 text-white rounded-lg flex items-center justify-center shadow-xl shadow-green-300">Vue</li>
                <li className="p-5 m-4 w-36 border-2 border-orange-300 bg-orange-800 text-white rounded-lg flex items-center justify-center shadow-xl shadow-orange-300">Svelte</li>
                <li className="p-5 m-4 w-36 border-2 border-red-300 bg-red-800 text-white rounded-lg flex items-center justify-center shadow-xl shadow-red-300">Angular</li>
                <li className="p-5 m-4 w-36 border-2 border-cyan-300 bg-cyan-600 text-white rounded-lg flex items-center justify-center shadow-xl shadow-cyan-300">Qwik</li>
            </ul>
        </div>
    );
}
 
export default Tech;
