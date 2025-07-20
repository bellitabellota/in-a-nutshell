import { useRef, useState } from "react";
import NavBar from "./NavBar";
import ProfileCard from "./ProfileCard";

function Contacts() {
  const tokenInputRef = useRef(null);
  // ba11bfd39333d12cc304 - Olivia's token
  // b4d1cefc1fccd579ea18 - Anna's token
  const [searchedProfile, setSearchedProfile]= useState(undefined);

  const searchHandler = () => {
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
    alert("Connect")
  }
  
  return(
    <main>
      <NavBar />
      <input type="text" ref={tokenInputRef} />
      <button onClick={searchHandler}>Search</button>
      {searchedProfile && <ProfileCard profile={searchedProfile} renderActions={() => <button onClick={connectHandler}>Connect</button>}/>}
    </main>
  )
}

export default Contacts;