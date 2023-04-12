import React, { useState } from "react";
import "./checkout.css";
import moment from "moment";

const Checkout = () => {

  return (
    <>
      <div class="custom-container px-5">
        <h1 class="text-center py-4">checkout</h1>
        <div class="row">
          <div class="col-md-7">
            <h4 class="mb-3">Address</h4>
            <form
              id="checkout_form"
              enctype="multipart/form-data"
              method="post"
              class="needs-validation checkout_form"
              novalidate=""
            >
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="fname">First name</label>
                  <input
                    type="text"
                    class="form-control check_user"
                    id="fname"
                    name="fname"
                    placeholder="First Name"
                    required=""
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="lname">Last name</label>
                  <input
                    type="text"
                    class="form-control check_user"
                    id="lname"
                    name="lname"
                    placeholder="Last Name"
                    required=""
                  />
                </div>
              </div>

              <div class="mb-3">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control check_user"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required=""
                />
              </div>

              <div class="mb-3">
                <label for="address">Address</label>
                <input
                  type="text"
                  class="form-control check_user"
                  id="address"
                  name="address"
                  placeholder="1234 Main St"
                  required=""
                />
              </div>

              <div class="row">
                <div class="col-md-5 mb-3">
                  <label for="state">State</label>
                  <input
                    type="text"
                    class="form-control check_user"
                    id="state"
                    name="state"
                    placeholder="state"
                    required=""
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label for="city">City</label>
                  <input
                    type="text"
                    class="form-control check_user"
                    id="city"
                    name="city"
                    placeholder="city"
                    required=""
                  />
                </div>
                <div class="col-md-3 mb-3">
                  <label for="zip_code">Zip</label>
                  <input
                    type="text"
                    class="form-control check_user"
                    pattern="[0-9]{6}"
                    id="zip_code"
                    name="zip_code"
                    placeholder=""
                    required=""
                  />
                </div>
              </div>

              <hr class="mb-4" />
              <div class="time">
                <h5>When should the professional arrive?</h5>
                <p>Your service will take approx. 30 mins</p>

                <div class="d-flex">
                  <div class="text-center py-2 px-3 m-2  time-date">
                    <p class="mb-0 text-muted text-capitalize day-name">Thu</p>
                    <p class="mb-0 fw-bold">13</p>
                  </div>
                  <div class="text-center py-2 px-3 m-2  time-date">
                    <p class="mb-0 text-muted text-capitalize day-name">Fri</p>
                    <p class="mb-0 fw-bold">14</p>
                  </div>
                </div>
                <hr />
                <div class="pick-slot">
                  <h5>Select start time of service</h5>
                  <div class="d-flex flex-wrap">
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      08:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:00 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                    <div class="text-uppercase d-flex justify-content-center align-items-center p-2 m-2 time-slot">
                      09:30 am
                    </div>
                  </div>
                </div>
              </div>
              <hr class="mb-4" />
              <button class="btn font-bold p-2 checkout-btn">
                Proceed to checkout
              </button>
            </form>
          </div>
          <div class=" col-md-5 checkout-cart-total">
            <h4 class="mb-3">Cart Total</h4>
            <div class="checkout_cart_summary">
              <h4 class="d-flex justify-content-between">
                Product <span>Total</span>
              </h4>

              <ul>
                <li class="d-flex justify-content-between">
                  Samsome Notebook Pro 5 X 01 <span>$295.00</span>
                </li>
                <li class="d-flex justify-content-between">
                  Aquet Drone D 420 X 02 <span>$550.00</span>
                </li>
                <li class="d-flex justify-content-between">
                  Play Station X 22 X 01 <span>$295.00</span>
                </li>
                <li class="d-flex justify-content-between">
                  Roxxe Headphone Z 75 X 01 <span>$110.00</span>
                </li>
              </ul>

              <p class="d-flex justify-content-between">
                Sub Total <span>$1250.00</span>
              </p>
              <p class="d-flex justify-content-between">
                Shipping Fee <span>$00.00</span>
              </p>

              <h4 class="d-flex justify-content-between">
                Grand Total <span>$1250.00</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
