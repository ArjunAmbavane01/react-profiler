const Profile = () => {
    return <>
    <div className="profile-container">
        <div className="card-container">
            <div className="img-container">
                <img src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250" alt="" />
            </div>
            <div className="details-container">
                <h1>Henry Alioca</h1>
                <a href="/">LinkedIn Link</a>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia in urna quis finibus. Ut at dignissim felis. Integer egestas turpis ut dictum posuere</p>
                <button id="editBtn">Edit</button>
                <button id="deleteBtn">Delete</button>
            </div>
        </div>
    </div>
    </>
}

export default Profile;