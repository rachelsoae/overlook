// * IMPORTS * //

// Stylesheet
import './css/styles.css';

// Images
import './images/jr-suite.png'
import './images/res-suite.png'
import './images/suite.png'
import './images/single-room.png'

// Functions
import {
  getBookings,
  getTotalCost
} from './bookings'

import {
  setDashboard
} from './dom-updates'

// SAMPLE DATA TO BE DELETED AND REPLACED WITH API CALLS
import {
  bookings,
  rooms,
  customers
} from './sample-data'

// * GLOBAL VARIABLES * //
const yourBookings = document.querySelector('.bookings-list')
const yourBookingsCost = document.querySelector('.bookings-cost-insert')

// Event Listeners
window.addEventListener('load', () => {
  setDashboard(customers[0], bookings, rooms);
})


// on page load, display every booking for a user
// get list of bookings
// get total cost
// display innerHTML

export {
  bookings,
  rooms,
  customers,
  yourBookings,
  yourBookingsCost
}