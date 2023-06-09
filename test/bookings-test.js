import chai from 'chai';
const expect = chai.expect;
import { 
  bookings, 
  bookings1, 
  bookings5, 
  rooms, 
  availRooms1, 
  customers 
} from '../src/sample-data'
import { getBookings, getTotalCost, searchByDate } from '../src/bookings'

describe('Bookings per customer', () => {
  const customer1 = customers[0];
  const customer2 = customers[1];
  const customer3 = customers[2];
  const allBookings = bookings;
  const bookingsA = bookings1;
  const bookingsB = bookings5;
  
  it('Should list all user\'s previous bookings', () => {
    const customer1Bookings = getBookings(allBookings, customer1)
    
    expect(customer1Bookings).to.deep.equal(bookingsA);
  });

  it('Should be able to list bookings for a different user', () => {
    const customer2Bookings = getBookings(allBookings, customer2)

    expect(customer2Bookings).to.deep.equal(bookingsB);
  });

  it('Should return a message if the user has no bookings', () => {    
    const customer3Bookings = getBookings(allBookings, customer3)

    expect(customer3Bookings).to.equal('You don\'t have any bookings yet. Book your first stay today!')
  });
});

describe('Cost per customer', () => {
  const customer1 = customers[0];
  const customer2 = customers[1];
  const customer3 = customers[2];
  const allBookings = bookings;
  const allRooms = rooms;

  it('Should be able to calculate the total cost of bookings for a user', () => {
    const customer1Bookings = getBookings(allBookings, customer1)

    const customer1Cost = getTotalCost(allRooms, customer1Bookings)

    expect(customer1Cost).to.equal('1875.34')
  });

  it('Should be able to calculate the total cost for a different user', () => {
    const customer2Bookings = getBookings(allBookings, customer2)

    const customer2Cost = getTotalCost(allRooms, customer2Bookings)

    expect(customer2Cost).to.equal('1623.62')
  });

  it('Should return 0 if the user has no bookings', () => {
    const customer3Bookings = getBookings(allBookings, customer3);

    const customer3Cost = getTotalCost(allRooms, customer3Bookings);

    expect(customer3Cost).to.equal(0);
  })
});

describe('Search available rooms', () => {
  const roomsAvailXmas2025 = availRooms1;
  const allBookings = bookings;
  const allRooms = rooms;
  
  it('Should return a list of rooms available on a given date', () => {
    const date = '2025/12/25'

    const roomsByDate = searchByDate(allBookings, allRooms, date);

    expect(roomsByDate).to.deep.equal(roomsAvailXmas2025)
  });

  it.skip('Should return a message if no rooms are available', () => {

  });

})

// if a room is available on a date, then bookings does NOT contain a booking with the same room number && date

// iterate over bookings
// return bookings with dates that match the given date
// iterate over rooms
// for each room, check to see if the room number is included in 