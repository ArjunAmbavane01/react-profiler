import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userId,setContacts  }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [imgLoading, setImgLoading] = useState(true);
  const { data: userData, isLoading: userLoading } = useFetch(
    `http://localhost:3000/contacts/${userId}`
  );

  const handleDelete = async () => {
    try {
      const resp = await fetch(`http://localhost:3000/contacts/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      const data = await resp.json();

      if (data.type === "success") {
        setContacts(data.contacts); 
        alert("Contact deleted successfully!");
        navigate("/"); 
      } else {
        console.log("Failed to delete contact: " + data.error);
      }
    } catch (e) {
      console.log("Error deleting contact: " + e.message);
    }
  };

  useEffect(() => {
    if (userData && userData.user) {
      setUser(userData.user);
    }
  }, [userData]);

  

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
              <button id="deleteBtn" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
