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
  getCustomersData,
  getBookingsData,
  getRoomsData,
} from './api-calls'

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
let allCustomers, allBookings, allRooms;

const yourBookings = document.querySelector('.bookings-list')
const yourBookingsCost = document.querySelector('.bookings-cost-insert')

// Event Listeners

window.addEventListener('load', () => {
  Promise.all([getCustomersData(), getBookingsData(), getRoomsData()])
  .then(data => {
    allCustomers = data[0].customers
    allBookings = data[1].bookings
    allRooms = data[2].rooms
    setDashboard(allCustomers[1], allBookings, allRooms)
  })
})

export {
  bookings,
  rooms,
  customers,
  yourBookings,
  yourBookingsCost
}