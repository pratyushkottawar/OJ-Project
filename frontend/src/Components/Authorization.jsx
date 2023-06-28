import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function Authorization() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    //console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "817400399705-fpooo8lkh53di4nsqrh2j63nl8qc8rjq.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  // If we do not have a user we want to show log in button
  // else we want to show log out button

  return (
    <>
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 && (
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      )}
      {user && (
        <div>
          <img src={user.picture} />
          <h3>{user.name}</h3>
        </div>
      )}
    </>
  );
}

export default Authorization;
