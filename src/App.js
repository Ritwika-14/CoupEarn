import { useEffect, useState } from "react";
import ScrollToTop from "react-scroll-to-top";
import {
  auth,
  googleProvider,
  db,
  storage,
  useAuth,
  upload,
} from "./config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import Profile from "./profile";
import Landing from "./landing";
import Header from "./header";

import Review from "./review";

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  let variable = -1;
  let temp;
  const currentUser = useAuth();
  const [logging, setLogging] = useState(true);
  const [couponList, setCouponList] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  // New Coupon States
  const [newCouponTitle, setNewCouponTitle] = useState("");
  const [newCouponDes, setNewCouponDes] = useState("");
  const [newCouponDate, setNewCouponDate] = useState("");
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponPrice, setNewCouponPrice] = useState("");

  const [reviewTitle, setReviewTitle] = useState("");
  const [author, setAuthor] = useState("");

  // File Upload State
  const [fileUpload, setFileUpload] = useState(null);

  const couponsCollectionRef = collection(db, "coupons");
  const reviewsCollectionRef = collection(db, "reviews");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(true);

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [checkout, setCheckOut] = useState(false);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser((prev) => !prev);
      alert("You are Signed in");
      setLogging(!logging);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setUser((prev) => !prev);
      alert("You are Signed in");
      setLogging(!logging);
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

  const getCouponList = async () => {
    try {
      const data = await getDocs(couponsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setCouponList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCouponList();
  }, []);

  const getReviewList = async () => {
    try {
      const data = await getDocs(reviewsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviewList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReviewList();
  }, []);

  const onSubmitCoupon = async () => {
    try {
      await addDoc(couponsCollectionRef, {
        title: newCouponTitle,
        description: newCouponDes,
        date: newCouponDate,
        code: newCouponCode,
        price: newCouponPrice,
        userId: auth?.currentUser?.uid,
      });
      getCouponList();
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitReview = async () => {
    try {
      await addDoc(reviewsCollectionRef, {
        title: reviewTitle,
        author: author,
        userId: auth?.currentUser?.uid,
      });
      getReviewList();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <ScrollToTop smooth color="#6f00ff" />
      {logging ? (
        <>
          <Header />
          <Landing />
          <div className="flex1">
            <span
              className="btn3"
              onClick={() => {
                user ? setLogging(!logging) : setLogging(logging);
              }}
            >
              {user ? "Sign up" : "Signed-in"}
            </span>
          </div>

          <div className="coupon-sed" id="sell">
            <h1 className="heading">Sell Coupons</h1>
            <input
              className="elements"
              placeholder="Coupon Title..."
              onChange={(e) => setNewCouponTitle(e.target.value)}
            />
            <input
              className="elements"
              placeholder="Description..."
              onChange={(e) => setNewCouponDes(e.target.value)}
            />
            <input
              className="elements"
              placeholder="Expiry Date..."
              onChange={(e) => setNewCouponDate(e.target.value)}
            />
            <input
              className="elements"
              placeholder="Code..."
              onChange={(e) => setNewCouponCode(e.target.value)}
            />
            <input
              className="elements"
              placeholder="Price..."
              onChange={(e) => setNewCouponPrice(e.target.value)}
            />
            <div className="fileinput">
              <input
                type="file"
                onChange={(e) => setFileUpload(e.target.files[0])}
              />
              <button onClick={uploadFile} className="btn2">
                {" "}
                Upload File{" "}
              </button>
            </div>

            <button className="btn1" onClick={onSubmitCoupon}>
              {" "}
              Submit Coupon
            </button>
          </div>

          <div className="buy" id="buy">
            <h1 className="heading">Buy Coupons</h1>
            <div class="box-container1">
              {couponList.map((coupon) => (
                <div>
                  <div class="box">
                    <div class="box-head">
                      <img
                        className="buy-image"
                        src="https://static.vecteezy.com/system/resources/previews/019/632/927/original/3d-minimal-discount-coupon-special-offer-promotion-flash-sale-icon-3d-illustration-free-png.png"
                        alt=""
                      />
                      <span class="menu-category">{coupon.title}</span>
                      <h3>{coupon.description}</h3>
                      <div class="price">
                        Exp Dt: <span>{coupon.date}</span>
                      </div>
                    </div>
                    <div class="box-bottom">
                      {variable === temp ? (
                        <div className="btn">
                          <p>Coupon code: {coupon.code}</p>
                        </div>
                      ) : (
                        <div
                          className="btn"
                          onClick={() => {
                            temp = variable;
                          }}
                        >
                          <a href="https://buy.stripe.com/test_fZe8A87MOgssegEaEE">
                            Pay Rs {coupon.price}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className="review" id="review">
            <h1 class="heading">customer's review </h1>
            <div className="box-container1">
              {reviewList.map((reviews) => (
                <div class="box1">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/004/235/343/non_2x/five-star-top-review-logo-modern-chat-icon-talk-quotes-in-trendy-linear-line-style-dark-background-free-vector.jpg"
                    alt="quote"
                  />
                  <p>{reviews.title}</p>

                  <h3>{reviews.author}</h3>
                  <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex">
              <textarea
                className="element1"
                placeholder="Add a review..."
                onChange={(e) => setReviewTitle(e.target.value)}
              />
              <input
                className="element1"
                placeholder="Name..."
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <button className="btn1" onClick={onSubmitReview}>
              {" "}
              Submit
            </button>
          </section>
          <Review />
        </>
      ) : (
        <div>
          {user && (
            <div className="Authenticate">
              <h1 className="heading">Sign-up</h1>
              <input
                className="field"
                placeholder="Email..."
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="field"
                placeholder="Password..."
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input type="file" className="field1" onChange={handleChange} />
              <p className="red">*profile picture is required</p>
              <button
                disabled={loading || !photo}
                className="btn1"
                onClick={handleClick}
              >
                Upload
              </button>
              <div className="flex">
                <button className="btn1" onClick={signIn}>
                  {" "}
                  Sign In
                </button>
                <button className="btn1" onClick={signInWithGoogle}>
                  {" "}
                  Sign In With Google
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
