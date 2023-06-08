import {
  getBookings,
  getTotalCost
} from './bookings'

import {
  bookings,
  rooms,
  customers,
  yourBookings
} from './scripts'

const setDashboard = (customer, allBookings, allRooms) => {
  const usersBookings = getBookings(allBookings, customer);
  const spent = getTotalCost(allRooms, usersBookings);

  yourBookings.innerHTML = '';
  usersBookings.forEach(booking => {
    let room = allRooms.find(room => room.number === booking.roomNumber);
    let image = setRoomImage(room);
    let bidet = checkForBidet(room);
    console.log(bidet)

    yourBookings.innerHTML += 
    `
    <article class="room">
          <img class="room-image" src=${image}>
          <p class="room-type">${room.roomType}</p>
          <span class="num-beds-container">
            <span class="num-beds">${room.numBeds}</span>
            <span class="material-icons-round">bed</span>
          </span>
          <p class="bed-size">${room.bedSize}</p>
          <p class="bidet">${bidet}</p>
          <p class="cost-per-night">$${room.costPerNight}/night</p>
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