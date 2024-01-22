import { useEffect, useState } from "react";
import { useAuth, upload, auth } from "./config/firebase";
import { signOut } from "firebase/auth";

export default function Profile() {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [logging, setLogging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const [view, setView] = useState(false);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(true);
      alert("You are Logged out");
      setLogging(true);
    } catch (err) {
      console.error(err);
    }
  };

  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  function handleClick() {
    upload(photo, currentUser, setLoading);
  }
  function Display() {
    setView(!view);
  }

  useEffect(() => {
    try {
      if (currentUser?.photoURL) {
        setPhotoURL(currentUser.photoURL);
      }
    } catch {
      alert("Kindly sign in first");
    }
  }, [currentUser]);

  return (
    <>
      <span className="fields">
        <img src={photoURL} alt="Avatar" className="avatar" onClick={Display} />
      </span>
      <>
        {view ? (
          <>
            <div className="display">
              <img
                src={photoURL}
                alt="Avatar"
                className="avatar"
                onClick={Display}
              />
              <p>Profile-info: {currentUser.email}</p>
              <p>Status:Signed-in</p>
              <p>#Coup-earn</p>
              <button className="btn2" onClick={logout}>
                {" "}
                Logout{" "}
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    </>
  );
}
