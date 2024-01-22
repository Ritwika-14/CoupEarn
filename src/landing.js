import React from "react";
import pic from "./assets/logo1.png";
export default function Landing() {
  return (
    <div>
      <section class="home" id="home">
        <div class="content">
          <h3 class="b">Sell unused Coupons</h3>
          <p>
            Raise your hand if you've collected expiring coupons from UPI
            payments 👋😉
          </p>
        </div>
        <div className="logosec">
          <img src={pic} alt="logo" />
        </div>
      </section>
    </div>
  );
}
