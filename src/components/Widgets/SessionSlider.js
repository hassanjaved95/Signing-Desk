/**
 ** Session Slider
 **/
import React, { Component } from "react";
import Slider from "react-slick";
import axios from 'axios';
import $ from 'jquery';

// api
import api from "Api";

var axiosObj = axios.create({
  baseURL: 'http://reactify.theironnetwork.org/data/',
  //baseURL: config.apiBaseUrl + '/',
  timeout: 2000
});

export default class SessionSlider extends Component {
  state = {
    sessionUsersData: null
  };

  componentDidMount() {
    console.log('Pakra gya hai.');

    this.getSessionUsersData();
    this.setSlickSliderHeight();
  }

  setSlickSliderHeight = () => {

    var loginPageHeight = $('.row.row-eq-height').height();
    $('.slick-track').height(loginPageHeight);
  }
  // session users data
  getSessionUsersData() {

    axiosObj.get("testimonials.js")
      .then(response => {
        console.log(response);
        this.setState({ sessionUsersData: response.data });
      })
      .catch(error => {
        // error handling
      });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      swipe: true,
      touchMove: true,
      swipeToSlide: true,
      draggable: true
    };
    const { sessionUsersData } = this.state;
    return (
      <div className="session-slider">
        <Slider {...settings}>
          {sessionUsersData &&
            sessionUsersData !== null &&
            sessionUsersData.map((data, key) => (
              <div key={key}>
                <img
                  src={require(`Assets/img/session-${key + 1}.jpg`)}
                  alt="session-slider"
                  className="img-fluid"
                  height="500"
                />
                <div className="rct-img-overlay">
                  <h5 className="client-name">{data.name}</h5>
                  <span>{data.designation}</span>
                  <p className="mb-0 fs-14">{data.body}</p>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    );
  }
}
