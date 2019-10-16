import React, { Component } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";
import { Parallax, Background } from "react-parallax";
import "../assets/scss/HomePage.css";

class Home extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div>
        <Navbar className="navbar" router={this.props.ownProps.router} />
        <Parallax
          bgImage={"/img/parallax.jpg"}
          bgImageAlt="the cat"
          strength={900}
        >
          <section class="agnecy-section1">
            <div class="container agnecy-section1__container">
              <div class="row parallax-content">
                <div class="col-lg-6 mb-5">
                  <div class="row agnecy-section1__main-row">
                    <div class="col-12 agnecy-section1__heading">
                      <p class="agnecy-section1__title">
                        OUR STRONG ORGANISATION
                      </p>
                    </div>
                    <div class="col-lg-11 agnecy-section1__content">
                      <p class="agnecy-section1__text">
                        Lorem ipsum dolor sit amet, consectetur adipis cing
                        elit, sed do eiusmod tempor incididunt ut labore et.
                        ectetur adig ipis cing elit, sed do eiusmod tempor
                        incididunt.
                      </p>
                    </div>
                    <div class="col-sm-5">
                      <a href="#" class=" agnecy-section1__link-main">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <a href="#" class="padding-hack">
                    <img src="/img/firstpage.jpg" alt="img" class="img" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </Parallax>
        <section id="section1" class="agnecy-section2">
          <div class="container">
            <div class="row justify-content-between">
              <div class="col-lg-5">
                <div class="row agnecy-section2__row">
                  <div class="col-12 mb-4">
                    <p class="agnecy-section2__title">
                      do you know we can provide for you ?
                    </p>
                  </div>
                  <div class="col-12 mb-4">
                    <p class="agnecy-section1__text">
                      Lorem ipsum dolor sit amet, consectetur adipis cing elit,
                      sed do eiusmod tempor incididunt ut labore et.Lorem ni
                      ipsum dolor sit amet, consectetur adipis cing elit, ed doi
                      eiusmod tempor incididunt ut labore et.
                    </p>
                  </div>
                  <div class="col-sm-6">
                    <a href="#" class=" agnecy-section2__link-main">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="row">
                  <div class="col-sm-6 agnecy-section2__col">
                    <span class="agnecy-section2__icon"></span>
                    <p class="agnecy-section2__subtitle">Management</p>
                    <p class="agnecy-section2__text">
                      Lorem ipsum dolor sitea amet, zixf conseit adipi cing
                      elit, seddi do eiusmod btdempor in didunt utlae ore
                      etioe.Lorem ipsum new idolo
                    </p>
                  </div>
                  <div class="col-sm-6 agnecy-section2__col">
                    <span class="agnecy-section2__icon"></span>
                    <p class="agnecy-section2__subtitle">Logo / Branding</p>
                    <p class="agnecy-section2__text">
                      Lorem ipsum dolor sitea amet, zixf conseit adipi cing
                      elit, seddi do eiusmod btdempor in didunt utlae ore
                      etioeew idolor sit amet,
                    </p>
                  </div>
                  <div class="col-sm-6 agnecy-section2__col">
                    <span class="agnecy-section2__icon"></span>
                    <p class="agnecy-section2__subtitle">UI /UX Design</p>
                    <p class="agnecy-section2__text">
                      Lorem ipsum dolor sitea amet, zixf conseit adipi cing
                      elit, seddi do eiusmod btdempor in didunt utlae ore
                      etioe.Lorem ipsum new idolor sit amet,
                    </p>
                  </div>
                  <div class="col-sm-6 agnecy-section2__col">
                    <span class="agnecy-section2__icon"></span>
                    <p class="agnecy-section2__subtitle">Animation</p>
                    <p class="agnecy-section2__text">
                      Lorem ipsum dolor sitea amet, zixf conseit adipi cing
                      elit, seddi do eiusmod btdempor in didunt utlae ore
                      etioe.Lorem ipsum new idolor sit amet, consect netur.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="section2" class="agnecy-section3">
          <div class="container">
            <div class="row agnecy-section3__row1">
              <div class="col-lg-5 col-xl-4 mb-3">
                <span class="agnecy-section3__title">FEATURE PRODUCTS</span>
              </div>
              <div class="col-lg-5 mb-5">
                <span class="agnecy-section3__text">
                  Lorem ipsum dolor sit amet, consectetur adipis cing elit,sed
                  do eiusmod tempor incididunt ut labore et.
                </span>
              </div>
              <div class="col-xl-9 mb-5">
                <ul class="agnecy-section3__list">
                  <li class="agnecy-section3__item">
                    <a href="#" class="agnecy-section3__link">
                      ALL
                    </a>
                  </li>
                  <li class="agnecy-section3__item">
                    <a href="#" class="agnecy-section3__link">
                      PRINT TEMPLATE
                    </a>
                  </li>
                  <li class="agnecy-section3__item">
                    <a href="#" class="agnecy-section3__link">
                      WEB TEMPLATE
                    </a>
                  </li>
                  <li class="agnecy-section3__item">
                    <a href="#" class="agnecy-section3__link">
                      USER INTERFACE
                    </a>
                  </li>
                  <li class="agnecy-section3__item">
                    <a href="#" class="agnecy-section3__link">
                      MOCK-UP
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-12">
                <div class="row agnecy-section3__row2">
                  <div class="col-sm-6 col-xl-3">
                    <a href="#" class="padding-hack">
                      <img src="/img/product1.jpg" alt="" class="img" />
                    </a>
                  </div>
                  <div class="col-sm-6 col-xl-3">
                    <a href="#" class="padding-hack">
                      <img src="/img/product2.jpg" alt="" class="img" />
                    </a>
                  </div>
                  <div class="col-sm-6 col-xl-3">
                    <a href="#" class="padding-hack">
                      <img src="/img/product3.jpg" alt="" class="img" />
                    </a>
                  </div>
                  <div class="col-sm-6 col-xl-3">
                    <a href="#" class="padding-hack">
                      <img src="/img/product4.jpg" alt="" class="img" />
                    </a>
                  </div>
                  <div class="col-sm-6 col-xl-3">
                    <a href="#" class="padding-hack">
                      <img src="/img/product5.jpg" alt="" class="img" />
                    </a>
                  </div>
                  <div class="col-sm-6 col-xl-3">
                    <a href="#" class="padding-hack">
                      <img src="/img/product6.jpg" alt="" class="img" />
                    </a>
                  </div>
                  <div class="col-sm-6 col-xl-3">
                    <a href="#" class="padding-hack">
                      <img src="/img/product7.jpg" alt="" class="img" />
                    </a>
                  </div>
                  <div class="col-sm-6 col-xl-3">
                    <a href="#" class="padding-hack">
                      <img src="/img/product8.jpg" alt="" class="img" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="section3" class="agnecy-section4">
          <div class="container">
            <div class="row mb-5">
              <div class="col-lg-5">
                <span class="agnecy-section3__title">MEET OUR TEAM</span>
                <span class="agnecy-section4__text">
                  Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed
                  dooing eiusmod tempor incididut labore Ui / Ux , print
                  template.
                </span>
              </div>
            </div>
            <div class="row agnecy-section4__row3 justify-content-xl-between">
              <div class="col-sm-3 agnecy-section4__col1">
                <a href="#" class="padding-hack">
                  <img src="/img/person1.png" alt="" class="img" />
                </a>
              </div>
              <div class="col-xl-8">
                <div class="row agnecy-section4__row1">
                  <div class="col-lg-4 mb-3">
                    <span class="agnecy-section4__heading">MARK WAUGH</span>
                  </div>
                  <div class="col-lg-9 mb-4">
                    <span class="agnecy-section4__lorem">
                      Lorem ipsum dolor sit amet, consectetur adipis cing elit,
                      sed dooing eiusmod tempor incididut labore Ui / Ux , print
                      template.
                    </span>
                  </div>
                  <div class="col-lg-6 mb-5">
                    <ul class="agnecy-section4__list">
                      <li class="agnecy-section4__item">
                        <a href="#" class="agnecy-section4__link">
                          Facebook
                        </a>
                      </li>
                      <li class="agnecy-section4__item">
                        <a href="#" class="agnecy-section4__link">
                          Dribble
                        </a>
                      </li>
                      <li class="agnecy-section4__item">
                        <a href="#" class="agnecy-section4__link">
                          Behance
                        </a>
                      </li>
                      <li class="agnecy-section4__item">
                        <a href="#" class="agnecy-section4__link">
                          Twitter
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div class="col-12">
                    <div class="row agnecy-section4__row2">
                      <div class="col-sm-3">
                        <a href="#" class="padding-hack">
                          <img src="/img/person2.png" alt="" class="img" />
                        </a>
                      </div>
                      <div class="col-sm-3">
                        <a href="#" class="padding-hack">
                          <img src="/img/person3.png" alt="" class="img" />
                        </a>
                      </div>
                      <div class="col-sm-3">
                        <a href="#" class="padding-hack">
                          <img src="/img/person4.png" alt="" class="img" />
                        </a>
                      </div>
                      <div class="col-sm-3">
                        <a href="#" class="padding-hack">
                          <img src="/img/person5.png" alt="" class="img" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="agnecy-section5">
          <div class="container">
            <div class="row agnecy-section5__row">
              <div class="col-12 mb-4">
                <span class="agnecy-section5__title">
                  Design tips, tricks, and freebies. Delivered weekly.
                </span>
              </div>
              <div class="col-md-9 col-xl-7 mb-5">
                <span class="agnecy-section5__text">
                  Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed
                  do eiusmod.
                </span>
              </div>
              <div class="col-xl-8">
                <form action="#" class="agnecy-section5__form row">
                  <div class="col-md-8">
                    <input
                      type="email"
                      class="agnecy-section5__input"
                      placeholder="Email Address..."
                    />
                  </div>
                  <div class="col-md-3">
                    <input
                      type="submit"
                      class="agnecy-section5__submit"
                      value="SUBSCRIBE"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section id="section4" class="agnecy-section6">
          <div class="container">
            <div class="row mb-5">
              <div class="col-lg-7">
                <span class="agnecy-section6__title">GET IN TOUCH</span>
                <span class="agnecy-section6__text">
                  Lorem ipsum dolor sit amet, consectetur adipis cing elit, sed
                  do eiusmod tempor incididunt ut labore et.ur adipis cing elit,
                  sed do eiusmod tempor incididunt ut labore et. ur adipis cing
                  elit, sed do eiusmod tempor incididunt ut labore et.
                </span>
              </div>
            </div>
            <div class="row justify-content-lg-between">
              <div class="col-lg-7 agnecy-section6__col2">
                <form action="#" class="agnecy-section6__form">
                  <div class="row mb-5">
                    <div class="col-md-6">
                      <input
                        placeholder="Name"
                        type="text"
                        class="agnecy-section6__input-name"
                      />
                    </div>
                    <div class="col-md-6">
                      <input
                        placeholder="Your Mail"
                        type="email"
                        class="agnecy-section6__input-email"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-12 mb-5">
                      <textarea
                        placeholder="Type your message"
                        class="agnecy-section6__textarea"
                      ></textarea>
                    </div>
                    <div class="col-12">
                      <input
                        value="SEND MESSAGE"
                        type="submit"
                        class="agnecy-section6__submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div class="col-lg-4 agnecy-section6__col1">
                <div class="row agnecy-section6__row1">
                  <div class="col-10 mb-4">
                    <span class="agnecy-section6__info">contact info</span>
                  </div>
                  <div class="col-10 mb-3">
                    <span class="agnecy-section6__adress">
                      Jalalabad 24 / A, Ambaarkhana, Sylhet, Bangladesh
                    </span>
                  </div>
                  <div class="col-10 mb-3">
                    <span class="agnecy-section6__email">
                      redwan@deviserweb.com
                    </span>
                  </div>
                  <div class="col-10">
                    <span class="agnecy-section6__phone">
                      (+88) 017 617 46373
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="agnecy-footer">
          <div class="container">
            <div class="row agnecy-footer__row">
              <div class="col-md-6 col-lg-5 col-xl-4">
                <span class="agnecy-footer__copyright">
                  © Copyright @Junaed 2016, All rights reserved
                </span>
              </div>
              <div class="col-md-5 col-lg-4 col-xl-3">
                <ul class="agnecy-footer__list">
                  <li class="agnecy-footer__item">
                    <a href="#" class="agnecy-footer__link"></a>
                  </li>
                  <li class="agnecy-footer__item">
                    <a href="#" class="agnecy-footer__link"></a>
                  </li>
                  <li class="agnecy-footer__item">
                    <a href="#" class="agnecy-footer__link"></a>
                  </li>
                  <li class="agnecy-footer__item">
                    <a href="#" class="agnecy-footer__link"></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  auth: state.auth,
  ownProps
});

export default connect(mapStateToProps)(Home);
