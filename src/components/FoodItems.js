import React, { Component } from 'react'

export default class FoodItems extends Component {
  render() {
    return (
      <div>
        <div className="food-container">
          <div className="food-together">
            <div className="food-img">
              </div>
            <div className="food-info">
              <div className="food-title">Ancient Grain & Arugula Salad with Chicken</div>
              <div className="food-desc">Chicken raised without antibiotics, arugula, ancient grain blend, red grapes and fresh apple and cabbage slaw tossed with white sweet balsamic vinaigrette and topped with roasted and salted pumpkin seeds.</div>
              <div className="food-to-cart">
                <button className="btn-cart">Add to cart </button> &nbsp; &nbsp; $7
              </div>
            </div>
          </div>

          <div className="food-together">
            <div className="food-img">
              </div>
            <div className="food-info">
              <div className="food-title">Ancient Grain & Arugula Salad with Chicken</div>
              <div className="food-desc">Chicken raised without antibiotics, arugula, ancient grain blend, red grapes and fresh apple and cabbage slaw tossed with white sweet balsamic vinaigrette and topped with roasted and salted pumpkin seeds.</div>
              <div className="food-to-cart">
                <button className="btn-cart">Add to cart</button> &nbsp; &nbsp; $7
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
