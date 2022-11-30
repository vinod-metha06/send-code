import axios from "axios";
const  url="https://jsonplaceholder.typicode.com/photos";

export const getPhotos=async(page:any)=>{
    try {
        const photos=await axios.get(url+`?_limit=10&_page=${page}`);
        console.log(photos.data);
        return photos.data;
    } catch (error) {
        return 'error'
    }

}