import React, { Component } from 'react';

import './App.css'

import axios from 'axios';
import Parallax from 'parallax-js';

class App extends Component {
  constructor() {
    super()
    this.clouds = <div data-depth='0.1' className='bg-img'></div>
    this.state = {
      city: '',
      levels: [],
    }
  }

  getWeather() {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=\
        ${this.state.city}&appid=97f7b4290c7bb2038ceb9b9375121df4`)
      .then(response => {
        const data = response.data.weather[0]
        const weatherImage = (
          <img
            alt="weather"
            src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} />)
        this.setState({
          levels: [
            <div key={1} data-depth='0.5' className="levels">
              {weatherImage}
            </div>,
            <div
              key={1}
              data-depth='0.8'
              className="description font-bold text-gray-900">
              {data.description}
            </div>
          ]
        })
        this.parallax = new Parallax(this.scene, {
        })
      })
      .catch(error => console.log(`There is no data for ${this.state.city}!`))
  }

  componentDidMount() {
    this.parallax = new Parallax(this.scene, {
    })
  }

  componentWillUnmount() {
    this.parallax.disable()
  }

  render() {
    return (
      <div className="container mx-auto">
        <div
          data-relative-input="true"
          ref={el => this.scene = el}>
          {this.clouds}
          {this.state.levels}
        </div>
        <div className="flex items-center z-40 fixed top-0 right-0 input-row">
          <label className="flex-initial mr-3 font-bold text-gray-900"
            htmlFor="location">
            What's the weather like in
          </label>
          <form onSubmit={event => {
            event.preventDefault()
            this.getWeather()
          }}>
            <input
              id="location"
              type="text"
              className="flex-initial border-solid border border-gray-300
                rounded shadow w-2/5 p-2"
              placeholder="Toronto"
              onChange={event => {
                this.setState({
                  city: event.target.value
                }
              )}} />
            <input
              type="submit"
              value="Check"
              className="flex-initial ml-3 px-3 py-2 rounded font-bold input-button shadow" />
          </form>
        </div>
      </div>
    )
  }
}

export default App;
