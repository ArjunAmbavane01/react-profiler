import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import AddContact from "./components/AddContact";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    try {
      const resp = await fetch("http://localhost:3000/contacts");
      const data = await resp.json();
      if (data.type === "success") {
        setContacts(data.users);
      } else {
        console.log("Bad response " + data.error);
      }
    } catch (e) {
      console.log("Error occurred while fetching contacts " + e.message);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout contacts={contacts} />}>
          <Route
            path="/add-contact"
            element={
              <AddContact contacts={contacts} setContacts={setContacts} />
            }
          />
          {contacts.map((contact, index) => (
            <Route
              key={index}
              path={`/contacts/${contact._id}`}
              element={
                <Profile userId={contact._id} setContacts={setContacts} />
              }
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
