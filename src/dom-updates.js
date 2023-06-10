import {
  getBookings,
  getTotalCost,
  searchByDate
} from './bookings'

import {
  roomImages,
  yourBookings,
  yourBookingsCost,
  dateField,
  dashboard,
  searchResults,
  availableRooms
} from './scripts'

const setDashboard = (customer, allBookings, allRooms) => {
  const usersBookings = getBookings(allBookings, customer);
  
  if (typeof usersBookings === 'string') {
    yourBookingsCost.innerHTML = `<p>${usersBookings}</p>`
  } else {
    const spent = getTotalCost(allRooms, usersBookings);

    yourBookings.innerHTML = '';

    yourBookingsCost.innerHTML = `$${spent}`
    
    usersBookings.forEach(booking => {
      // getRoomInfo(booking)
      let room = allRooms.find(room => room.number === booking.roomNumber);
      let image = `./images/${roomImages[room.roomType]}.png`
      let bidet = checkForBidet(room);
  
      yourBookings.innerHTML += 
      `
      <article class="room">
        <h3 class="room-type">${room.roomType} ${bidet}</h3>  
        <p class="booking-date">${booking.date}</p>
        <img class="room-image" src=${image} alt="photo of a ${room.roomType}">
        <div class="room-details">
          <span class="material-icons-round">bed</span>  
          <p class="num-beds">${room.numBeds} ${room.bedSize}</p>
       </div>
      </article>
      `
    })
  }
}

// const getRoomInfo = (booking) => {
//   let room = allRooms.find(room => room.number === booking.roomNumber);
//   let image = `./images/${roomImages[booking.roomType]}.png`
//   let bidet = checkForBidet(room);
// }

const checkForBidet = (room) => {
  let bidet;
  room.bidet ? bidet = 'with bidet' : bidet = ''
  return bidet;
}

const displaySearchResults = (allBookings, allRooms, date) => {
  hide(dashboard)
  show(searchResults)

  const availRooms = searchByDate(allBookings, allRooms, date);
  availableRooms.innerHTML = '';

  if (typeof availRooms === 'string') {
    availableRooms.innerHTML = `<p>${availRooms}</p>`
  } else {
    availRooms.forEach(room => {
      const image = setRoomImage(room);
      const bidet = checkForBidet(room);
      const cost = room.costPerNight.toFixed(2)
      
      availableRooms.innerHTML +=
      `
      <article class="room">
        <h3 class="room-type">${room.roomType} ${bidet}</h3>  
        <img class="room-image" src=${image} alt="photo of a ${room.roomType}">
        <div class="room-details">
          <span class="material-icons-round">bed</span>  
          <p class="num-beds">${room.numBeds} ${room.bedSize}</p>
        </div>
        <p class="cost">$${cost} per night</p>
      </article>
      `
    }) 
  }
}

const hide = (element) => {
  element.classList.add('hidden');
}

const show = (element) => {
  element.classList.remove('hidden');
}



export {
  setDashboard,
  displaySearchResults
}