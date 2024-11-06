import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

const Profile = ({userId}) => {
    const [user, setUser] = useState({});
    const { data, isLoading } = useFetch(`http://localhost:3000/contacts/${userId}`);

    useEffect(()=>{
        if (data && data.user) {
            setUser(data.user);
        }
    },[data])
    
    return <>
    <div className="profile-container">
        {isLoading ? "Fetching User Data" : <div className="card-container">
            <div className="img-container">
                <img src={user.avatarUrl} alt="" />
            </div>  
            <div className="details-container">
                <h1>{user.username}</h1>
                <a href={user.linkedinUrl}>LinkedIn Link</a>
                <p>{user.description}</p>
                <button id="editBtn">Edit</button>
                <button id="deleteBtn">Delete</button>
            </div>
        </div>}
        
    </div>
    </>
}

export default Profile;