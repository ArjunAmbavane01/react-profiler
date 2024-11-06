import {useNavigate} from 'react-router-dom'

const Contact = ({name,userId}) => {

    const navigate = useNavigate();

    return <>
    <div className="contact-container" onClick={()=> navigate(`/contacts/${userId}`)}>
        {name}
    </div>
    </>
}

export default Contact;