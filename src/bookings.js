const getBookings = (bookingsArray, customer) => {
  return bookingsArray.filter(booking => booking.userID === customer.id)
  
  // iterate over array of bookings
  // filter
  // if booking user id matches customer id, return booking
}

export { getBookings }