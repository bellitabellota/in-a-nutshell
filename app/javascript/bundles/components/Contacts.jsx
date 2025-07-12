import { useRef } from "react";
import NavBar from "./NavBar";

function Contacts() {
  const tokenInputRef = useRef(null);
  // ba11bfd39333d12cc304 - Olivia's token

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
      console.log(data)
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      tokenInputRef.current.value = ``;
    })
  }
  
  return(
    <main>
      <NavBar />
      <input type="text" ref={tokenInputRef} />
      <button onClick={searchHandler}>Search</button>
    </main>
  )
}

export default Contacts;