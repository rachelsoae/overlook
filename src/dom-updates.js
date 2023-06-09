import {
  getBookings,
  getTotalCost,
  searchByDate
} from './bookings'

import {
  yourBookings,
  yourBookingsCost,
  dateField,
  dashboard,
  searchResults,
  availableRooms
} from './scripts'

const setDashboard = (customer, allBookings, allRooms) => {
  flatpickr(dateField, {
    minDate: 'today',
    altInput: true,
    altFormat: "F j, Y",
    dateFormat: "Y/m/d"
  })
  
  const usersBookings = getBookings(allBookings, customer);
  
  if (typeof usersBookings === 'string') {
    yourBookingsCost.innerHTML = `<p>${usersBookings}</p>`
  } else {
    const spent = getTotalCost(allRooms, usersBookings);

    yourBookingsCost.innerHTML = '';
    yourBookings.innerHTML = '';

    yourBookingsCost.innerHTML = `$${spent}`
    
    usersBookings.forEach(booking => {
      let room = allRooms.find(room => room.number === booking.roomNumber);
      let image = setRoomImage(room);
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