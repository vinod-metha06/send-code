import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import  reducer  from '../Hooks/reducers'
// const getDataFromAPI = () => {

//     const [data, setData] = useState([])
//     const [loading, setLoading] = useState(false)
//     const [error, setError] = useState('')
//     const URL = 'https://jsonplaceholder.typicode.com/photos'
//     function getData() {
//         setLoading(true)
//         axios
//             .get(URL)
//             .then((res) => {
//                 console.log(res.data)
//                 setData(res.data)
//                 setLoading(false)
//             })
//             .catch((e) => {
//                 setError(e)
//                 setLoading(false)
//             })
//     }

//     useEffect(() => {
//         getData();
//     }, []);

//     return { data, loading, error }
// }

// export default getDataFromAPI;


export const initialState = {
    loading: true,
    error: '',
    post: []
}


function fetchDatafromAPI(id) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const URL = `https://jsonplaceholder.typicode.com/photos${id}`

    useEffect(() => {

        async function a(){
           await axios
            .get(URL)
            .then(response => {
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
            })
            .catch(error => {
                dispatch({ type: 'FETCH_ERRROR', payload: error })
            })
        }
        a();
        
    }, [])

    return { state }
}

export default fetchDatafromAPI;