// "use client";
// import React, { createContext, useState, useContext } from "react";
// import themes from "./themes";
// import axios from 'axios';

// export const GlobalContext = createContext();
// export const GlobalUpdateContext = createContext();

// export const GlobalProvider = ({ children }) => {
//     const [selectedTheme, setSelectedTheme] = useState(0);
//     const [isLoading,setIsLoading]=useState(false);

//     const [tasks,setTasks]=useState([]);
//     const theme = themes[selectedTheme]; // This should work now
    
//     const allTasks=async ()=>{
//         setIsLoading(true);
//         try{
//             const res=await axios.get("/api/tasks");
//             setTasks(res.data);
//             setIsLoading(false);
//         } catch (error){
//             console.log(error);
//         }
//     };
    
//     React.useEffect(()=>{
//         allTasks();
//     },[]);
    
//     return (
//         <GlobalContext.Provider 
//         value={{ 
//             theme,
//             tasks,
//             }}
//             >
//             <GlobalUpdateContext.Provider value={{}}>
//                 {children}
//             </GlobalUpdateContext.Provider>
//         </GlobalContext.Provider>
//     );
// };

// export const useGlobalState = () => useContext(GlobalContext);
// export const useGlobalUpdate = () => useContext(GlobalUpdateContext);


"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import themes from "./themes"; // Adjust the import path as needed

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState([]);
    const theme = themes[selectedTheme]; // This should work now

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/tasks");
            console.log('API Response:', res.data); // Log the response data
            setTasks(res.data); // Ensure this is an array
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        allTasks();
    }, []);

    return (
        <GlobalContext.Provider value={{ theme, tasks }}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
