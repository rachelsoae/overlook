const getBookings = (bookingsArray, customer) => {
  let customerBookings = bookingsArray.filter(booking => booking.userID === customer.id);
  
  if (!customerBookings.length) {
    customerBookings = 'You don\'t have any bookings yet. Book your first stay today!'
  };

  return customerBookings;
};

const getTotalCost = (roomsArray, customerBookings) => {
  if (typeof customerBookings === 'string') {
    return 0;
  } else {
    const grandTotal = customerBookings.reduce((totalCost, booking) => {
      roomsArray.forEach(room => {
        if (booking.roomNumber === room.number) {
          totalCost += room.costPerNight;
        };
      })
      return totalCost;
    }, 0)
    return grandTotal.toFixed(2);
  };
};

const searchByDate = (bookingsArray, roomsArray, date) => {
  const unavailRooms = bookingsArray.filter(booking => booking.date === date).map(booking => booking.roomNumber);

  let availRooms = roomsArray.filter(room => !unavailRooms.includes(room.number));

  if (!availRooms.length) {
    availRooms = 'We\'re terribly sorry - all rooms are booked for the date you have selected. Please book a different date.'
  };

  return availRooms;
};

const searchByRoomType = (roomsArray, roomType) => {
  let desiredRooms = roomsArray.filter(room => room.roomType === roomType);

  if (!desiredRooms.length) {
    desiredRooms = `We\'re terribly sorry - there are no rooms of that type available for the date you have selected. Please select a different room type, or book a different date.`
  };

  return desiredRooms;
};

const parseUserID = (username) => {
  return parseInt(username.slice(8, username.length));
};

const validateUsername = (customers, username) => {
  const characters = username.split('');
  const letters = characters.splice(0, 8);
  const word = letters.join('');

  let id = parseUserID(username);
  customers.some(customer => customer.id === id) ? id = true : id = false;

  let validation;
  ((word === 'customer') && id) ? validation = true : validation = false;
  return validation;
};

const validatePassword = (password) => {
  let validation;
  password === 'overlook2021' ? validation = true : validation = false;
  return validation;
};

const configDate = (longDate) => {
  const date = new Date(longDate);
  console.log(date);
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  let formattedMonth;
  (month.toString().length === 1) ? formattedMonth = `0${month}`: formattedMonth = month;

  return `${year}/${formattedMonth}/${day}`
}

const getTodaysDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const day = today.getDate();
  const month = today.getMonth() + 1;

  const formatNum = num => {
    return (num.toString().length === 1) ? `0${num}`: num;
  }

  return `${year}/${formatNum(month)}/${formatNum(day)}`
}

const sortByDate = (bookings) => {
  return bookings.sort((a, b) => a.date.localeCompare(b.date)).reverse();
}

export { 
  getBookings, 
  getTotalCost, 
  searchByDate, 
  searchByRoomType,
  parseUserID,
  validateUsername,
  validatePassword,
  configDate,
  getTodaysDate,
  sortByDate
}