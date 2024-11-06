import { useState, useEffect, useRef } from "react";
import Contact from "./Contact";
import { Search } from "lucide-react";

const Sidebar = ({ contacts }) => {
  const [dispContacts, setDispContacts] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    setDispContacts(contacts);
  }, [contacts]);

  const displayContacts = () => {
    console.log("hi");
    const filteredContacts = contacts.filter((contact) => {
      const username = contact.username
      return username.startsWith(inputRef.current.value);
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
        <button className="addBtn">Add</button>
      </div>
      <div className="sidebar-body">
        {console.log(contacts)}
        {dispContacts ? dispContacts.map((contact,index) => {
          // return <Contact key={index} name={contact.username}></Contact>;
          return <Contact key={index} name={contact.name} userId={contact._id}></Contact>;
        }) : "Fetching Contacts"}
      </div>
    </div>
  );
};

export default Sidebar;