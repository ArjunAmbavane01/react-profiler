import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userId,setContacts }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [imgLoading, setImgLoading] = useState(true);
  const { data: userData, isLoading: userLoading } = useFetch(
    `http://localhost:3000/contacts/${userId}`
  );

  useEffect(() => {
    if (userData && userData.user) {
      setUser(userData.user);
    }
  }, [userData]);

  const deleteContact = async () => {
    const resp = await fetch(`http://localhost:3000/contacts/${userId}`,{
      method:'DELETE',
      body:{
        userId
      }
    });
    const respMsg = await resp.json();
    console.log(respMsg)
    setContacts(respMsg.contacts)
    navigate('/')
    alert(respMsg);
  }

  return (
    <>
      <div className="profile-container">
        {userLoading ? (
          "Fetching User Data"
        ) : (
          <div className="card-container">
            <div className="img-container">
              {imgLoading && <p>Loading Image...</p>}
              <img
                src={user.avatarUrl}
                alt=""
                onLoad={() => setImgLoading(false)}
                style={{ display: imgLoading ? "none" : "block" }}
              />
            </div>
            <div className="details-container">
              <h1>{user.username}</h1>
              <a href={user.linkedinUrl}>LinkedIn Link</a>
              <p>{user.description}</p>
              <button id="deleteBtn" onClick={deleteContact}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
