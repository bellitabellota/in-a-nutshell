import { useRef, useState, useContext, useEffect } from "react";
import NavBar from "./NavBar";
import ProfileCard from "./ProfileCard";
import ContactsContext from "../../contexts/ContactsContext";
import * as styles from "./Contacts.module.css"

function Contacts() {
  const tokenInputRef = useRef(null);
  const [searchedProfile, setSearchedProfile]= useState(undefined);
  const {contacts, setContacts} = useContext(ContactsContext)

  const searchHandler = (e) => {
    e.preventDefault();
    const searchedToken = tokenInputRef.current.value.trim();

    if (!searchedToken) {
      alert("Input field cannot be empty.");
      return;
    }

    fetch(`/api/v1/profiles/search?token=${searchedToken}`)
    .then((response) => {
      if(!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(errorData.error || `HTTP Error ${response.status}: ${response.statusText}`);
        })
      }
      return response.json();
    }).then((data) => {
      setSearchedProfile(data)
    }).catch((error) => {
      alert(error)
    }).finally(() => {
      tokenInputRef.current.value = ``;
    })
  }

  const connectHandler = () => {
    const url = "/api/v1/user_contacts/connect";
    const token = document.querySelector('meta[name="csrf-token"]')?.content || "test-csrf-token";
    const body = { user_contact: { contactId: searchedProfile.id } };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": token
      },
      body: JSON.stringify(body)
    })
    .then((response) =>{
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error(`${errorData.error} (HTTP status: ${response.status})` || `HTTP Error ${response.status}: ${response.statusText}`);
        });
      }
      return response.json();
    })
    .then(data => {
      setContacts([...contacts, data.contact])
    })
    .catch((error) => {
      alert(error)
    });
  };

  const isConnected = searchedProfile && contacts.some((contact) => contact.profile.connectToken === searchedProfile.connectToken);

  return( 
    <main className={styles.mainContacts}>
      <NavBar />
      <div className={`${styles.contentContacts} pattern-bg`}>
        <form className={styles.searchBarForm} onSubmit={searchHandler}>
          <input type="text" ref={tokenInputRef} placeholder="Enter A Connect Token" />
          <button type="submit" className="btn">Search</button>
        </form>
        <div className={styles.searchResultContainer}>
          {searchedProfile && <ProfileCard profile={searchedProfile} renderActions={() => (
            isConnected ? <p className={styles.connected}>Connected</p> : <button onClick={connectHandler} className="btn">Connect</button>
          )}/>}
        </div>
      </div>
    </main>
  )
}

export default Contacts;