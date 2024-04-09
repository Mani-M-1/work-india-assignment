import { useState } from "react";
import MovieContext from "./movieContext";


const MovieState = (props) => {



    const [state, setState] = useState("");



    return (
        <MovieContext.Provider value={{state, setState}}> 
            {props.children}
        </MovieContext.Provider>
    )
}


export default MovieState;