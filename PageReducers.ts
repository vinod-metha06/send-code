export const initailState={
    loading:true,
    photos:[],
    error:''
}

export const PhotoReducers=(state=initailState,action:any)=>{
    switch (action.type) {
        case "FETCH":
            return{
                ...state,
                loading:false,
                photos:state.photos.concat(action.payload)
            }
        case "FETCH_ERROR":
            return{
                ...state,
                loading:false,
                photos:[],
                error:'error'
                
                }    
        case "LOADING":
                    return{
                        ...state,
                        loading:true,
                        error:''
                        
                        } 
        
    
        default:
            state;
    }
}