import React from "react";
export default function Review() {
  return (
    <div>
      <section class="contact" id="contact">
        <h1 class="heading">contact us </h1>
        <div class="row">
          <iframe
            class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235850.6401089838!2d88.03549851745557!3d22.535444146780446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1692536263149!5m2!1sen!2sin"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <form>
            <h3>get in touch</h3>
            <div class="inputBox">
              <i class="fas fa-user"></i>
              <input type="text" placeholder="name" />
            </div>
            <div class="inputBox">
              <i class="fas fa-envelope"></i>
              <input type="email" placeholder="email" />
            </div>
            <div class="inputBox">
              <i class="fas fa-phone"></i>
              <input type="number" placeholder="number" />
            </div>
            <input type="submit" class="btn" value="contact now" />
          </form>
          <p class="deal text-center">
            The deal ends in <span id="demo"></span>
          </p>
        </div>
      </section>

      <section class="footer">
        <div class="search">
          <input type="text" class="search-input" placeholder="Search" />
          <button class="btn btn-primary">search</button>
        </div>
        <div class="share">
          <a href="#" class="fab fa-facebook"></a>
          <a href="#" class="fab fa-twitter"></a>
          <a href="#" class="fab fa-instagram"></a>
          <a href="#" class="fab fa-linkedin"></a>
          <a href="#" class="fab fa-pinterest"></a>
        </div>
        <div class="links">
          <a href="#home">home</a>
          <a href="#home">about</a>
          <a href="#buy">buy</a>
          <a href="#sell">sell</a>
          <a href="#review">review</a>
          <a href="#contact">contact</a>
        </div>
        <div class="credit">
          Copyright &copy; coup-earn.com | All rights reserved
        </div>
      </section>
    </div>
  );
}
