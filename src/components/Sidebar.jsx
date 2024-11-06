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
      // const username = contact.username
      const username = contact.name;
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
        {dispContacts.map((contact) => {
          return <Contact name={contact.name}></Contact>;
        })}
        {dispContacts.map((contact) => {
          return <Contact name={contact.name}></Contact>;
        })}
        {dispContacts.map((contact) => {
          return <Contact name={contact.name}></Contact>;
        })}
      </div>
    </div>
  );
};

export default Sidebar;
