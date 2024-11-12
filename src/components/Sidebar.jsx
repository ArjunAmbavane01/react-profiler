import { useState, useEffect, useRef } from "react";
import Contact from "./Contact";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ contacts }) => {
  const [dispContacts, setDispContacts] = useState([]);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setDispContacts(contacts);
  }, [contacts]);

  const handleAddClick = () =>{
    navigate('/add-contact')
  }

  const displayContacts = () => {
    const filteredContacts = contacts.filter((contact) => {
      const username = contact.username.toLowerCase();
      return username.startsWith(inputRef.current.value.toLowerCase());
    });
    console.log(dispContacts);
    setDispContacts(filteredContacts);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="search-container">
          <Search />
          <input
            type="text"
            ref={inputRef}
            onChange={displayContacts}
            name="search"
            id="search"
            placeholder="Search"
          />
        </div>
        <button className="addBtn" onClick={handleAddClick}>Add</button>
      </div>
      <div className="sidebar-body">
        {dispContacts ? (
          dispContacts.length == 0 ? (
            <div className="no-contacts">No Contacts</div>
          ) : (
            dispContacts.map((contact, index) => {
              return (
                <Contact
                  key={index}
                  name={contact.username}
                  userId={contact._id}
                ></Contact>
              );
            })
          )
        ) : (
          "Fetching Contacts"
        )}
      </div>
    </div>
  );
};

export default Sidebar;
