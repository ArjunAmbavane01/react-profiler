import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Profile from './components/Profile'
import useFetch from './hooks/useFetch.js';

function App() {
  const respMsg = useFetch("http://localhost:3000/contacts");
  const contacts = respMsg.data.users || []
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout contacts={contacts}/>}>
            {contacts.map((contact,index)=>{
              return <Route key={index} path={`/contacts/${contact._id}`} element={<Profile userId={contact._id}/>}/>
            })}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
