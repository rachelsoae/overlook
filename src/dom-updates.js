import {
  getBookings,
  getTotalCost
} from './bookings'

import {
  yourBookings,
  yourBookingsCost
} from './scripts'

const setDashboard = (customer, allBookings, allRooms) => {
  const usersBookings = getBookings(allBookings, customer);
  const spent = getTotalCost(allRooms, usersBookings);

  yourBookingsCost.innerHTML = '';
  yourBookings.innerHTML = '';

  yourBookingsCost.innerHTML = `$${spent}`

  usersBookings.forEach(booking => {
    let room = allRooms.find(room => room.number === booking.roomNumber);
    let image = setRoomImage(room);
    let bidet = checkForBidet(room);
    console.log(bidet)

    yourBookings.innerHTML += 
    `
    <article class="room">
      <h3 class="room-type">${room.roomType}</h3>  
      <p class="booking-date">${booking.date}</p>
      <img class="room-image" src=${image}>
      <div class="room-details">
        <span class="num-beds-container">
          <p class="num-beds">${room.numBeds}</p>
          <span class="material-icons-round">bed</span>
        </span>
        <p class="bed-size">${room.bedSize}</p>
        <p class="bidet">${bidet}</p>
      </div>
    </article>
    `
  })
}

const setRoomImage = (room) => {
  let image;
  if (room.roomType === 'residential suite') {
    image = './images/res-suite.png'
  } else if (room.roomType === 'suite') {
    image = './images/suite.png'
  } else if (room.roomType === 'single room') {
    image = './images/single-room.png'
  } else {
    image = './images/jr-suite.png'
  }
  return image;
}

const checkForBidet = (room) => {
  let bidet;
  room.bidet ? bidet = 'has bidet' : bidet = 'no bidet'
  return bidet;
}

export {
  setDashboard
}