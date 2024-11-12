import { useState } from "react"

const AddContact = ({contacts,setContacts}) => {

    const [username,setUsername] = useState('');
    const [linkedinUrl,setLinkedinUrl] = useState('');
    const [avatarUrl,setAvatarUrl] = useState('');
    const [description,setDescription] = useState('');

    const avatarOptions = [
        { url: 'https://avatar.iran.liara.run/public/59', label: 'Avatar 1' },
        { url: 'https://avatar.iran.liara.run/public/87', label: 'Avatar 2' },
        { url: 'https://avatar.iran.liara.run/public/61', label: 'Avatar 3' },
        { url: 'https://avatar.iran.liara.run/public/60', label: 'Avatar 4' },
        { url: 'https://avatar.iran.liara.run/public/16', label: 'Avatar 5' },
        { url: 'https://avatar.iran.liara.run/public/89', label: 'Avatar 6' },
        { url: 'https://avatar.iran.liara.run/public/62', label: 'Avatar 7' },
        { url: 'https://avatar.iran.liara.run/public/27', label: 'Avatar 8' },
        { url: 'https://avatar.iran.liara.run/public/49', label: 'Avatar 9' },
    ];

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        try{
            if(username.trim()=='' || linkedinUrl.trim()=='' || avatarUrl.trim()=='' || description.trim()==''){
                alert("Fill All Fields!");
                return;
            }
           
            const response = await fetch('http://localhost:3000/add-contact',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json" 
                },
                body:JSON.stringify({
                username,
                linkedinUrl,
                avatarUrl,
                description
                })
            });
            const respMsg = await response.json();
            if(respMsg.type == 'success'){
                console.log(respMsg.user)
                setContacts([...contacts,respMsg.user])
                alert('Contact Created Successfully!')
                setAvatarUrl('')
                setUsername('')
                setLinkedinUrl('')
                setDescription('')
            }
        } catch(e){
            console.log("Some Error Occurred While Submiting Form "+ e.message);
        }
    }

    return <div className="right">
    <div className="form-header">
        Add New Contact
    </div>
    <div className="form-body">
        <form>
            <label htmlFor="username">Name :</label>
            <input type="text" value={username} id="username" onChange={(e)=> setUsername(e.target.value)}/>
            <label htmlFor="linkedinUrl">Linkedin URL :</label>
            <input type="text" value={linkedinUrl} id="linkedinUrl" onChange={(e)=> setLinkedinUrl(e.target.value)} />


            <label htmlFor="avatarUrl">Avatar URL :</label>
                    <div className="custom-dropdown">
                        {avatarOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`dropdown-option ${avatarUrl === option.url ? 'selected' : ''}`}
                                onClick={() => setAvatarUrl(option.url)}
                            >
                                <img src={option.url} alt="avatar" className="avatar-img" />
                                <span>{option.label}</span>
                            </div>
                        ))}
                    </div>


            <label htmlFor="description">Description :</label>
    <textarea value={description} id="description" onChange={(e)=> setDescription(e.target.value)}></textarea>

    <button type="submit" className="submit-contact" onClick={handleFormSubmit}>Add Contact</button>
        </form>
    </div>
    </div>
}

export default AddContact;