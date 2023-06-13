import chai from 'chai';
const expect = chai.expect;
import { sampleData } from '../src/sample-data'
import { 
  getBookings, 
  getTotalCost, 
  searchByDate, 
  searchByRoomType,
  parseUserID,
  validateUsername,
  validatePassword
  
} from '../src/bookings'

describe('Bookings per customer', () => {
  const customers = sampleData.customers;
  const bookings = sampleData.bookings;
  
  it('Should list all user\'s previous bookings', () => {
    const leatha = customers[0];

    const leathasBookings = getBookings(bookings, leatha);
    
    expect(leathasBookings).to.deep.equal(leatha.bookings);
  });

  it('Should be able to list bookings for a different user', () => {
    const rocio = customers[1];

    const rociosBookings = getBookings(bookings, rocio);

    expect(rociosBookings).to.deep.equal(rocio.bookings);
  });

  it('Should return a message if the user has no bookings', () => {    
    const rachel = customers[2];

    const rachelsBookings = getBookings(bookings, rachel);

    expect(rachelsBookings).to.equal('You don\'t have any bookings yet. Book your first stay today!');
  });
});

describe('Cost per customer', () => {
  const customers = sampleData.customers;
  const bookings = sampleData.bookings;
  const rooms = sampleData.rooms;

  it('Should be able to calculate the total cost of bookings for a user', () => {
    const leatha = customers[0];
    const leathasBookings = getBookings(bookings, leatha);

    const leathasCost = getTotalCost(rooms, leathasBookings);

    expect(leathasCost).to.equal('1875.34');
  });

  it('Should be able to calculate the total cost for a different user', () => {
    const rocio = customers[1];
    const rociosBookings = getBookings(bookings, rocio);

    const rociosCost = getTotalCost(rooms, rociosBookings);

    expect(rociosCost).to.equal('1623.62');
  });

  it('Should return 0 if the user has no bookings', () => {
    const rachel = customers[2];
    const rachelsBookings = getBookings(bookings, rachel);

    const rachelsCost = getTotalCost(rooms, rachelsBookings)

    expect(rachelsCost).to.equal(0);
  });
});

describe('Search available rooms', () => {
  const bookings = sampleData.bookings;
  const rooms= sampleData.rooms;
  
  it('Should return a list of rooms available on a given date', () => {
    const xmasRooms = searchByDate(bookings, rooms, '2025/12/25');

    expect(xmasRooms).to.deep.equal([rooms[0], rooms[1], rooms[2]])
  });

  it('Should return a message if no rooms are available', () => {
    const halloweenRooms = searchByDate(bookings, rooms, '2023/10/31');

    expect(halloweenRooms).to.deep.equal('We\'re terribly sorry - all rooms are booked for the date you have selected. Please book a different date.');
  });

  it('Should return a list of rooms given a room type', () => {
    const onlyJuniorSuites = searchByRoomType(rooms, 'junior suite');

    expect(onlyJuniorSuites).to.deep.equal([rooms[3]])
  });

  it('Should return a list of rooms given a room type', () => {
    const onlyResidentialSuites = searchByRoomType(rooms, 'residential suite');

    expect(onlyResidentialSuites).to.deep.equal([rooms[0]])
  });

  it('Should return a message if no rooms of the selected type are available', () => {
    const xmasRooms = searchByDate(bookings, rooms, '2025/12/25')
    const onlyJuniorSuites = searchByRoomType(xmasRooms, 'junior suite');

    expect(onlyJuniorSuites).to.deep.equal(`We\'re terribly sorry - there are no rooms of that type available for the date you have selected. Please select a different room type, or book a different date.`);
  });
});

describe('Parse user data', () => {
  it('Should return a user\'s ID given their login username', () => {
    const leathasUsername = 'customer1';

    const leathasID = parseUserID(leathasUsername);

    expect(leathasID).to.equal(1);
  });

  it('Should be able to return a 2-digit user ID', () => {
    const bellsUsername = 'customer21';
    
    const bellsID = parseUserID(bellsUsername);

    expect(bellsID).to.equal(21);
  });
});

describe('Username validation', () => {
  const customers = sampleData.customers;
  
  it('Should return true if the username is valid', () => {
    const leathasUsername = 'customer1'

    const leathaValidation = validateUsername(customers, leathasUsername);

    expect(leathaValidation).to.equal(true);
  });

  it('Should return a message if username is not valid', () => {
    const elephantsUsername = 'elephant40';
    
    const elephantValidation = validateUsername(customers, elephantsUsername);

    expect(elephantValidation).to.equal('Oops! The username you have entered is invalid. Please try again.');
  });

  it('Should be case sensitive', () => {
    const rachelsUsername = 'cUsTomeR6';

    const rachelValidation = validateUsername(customers, rachelsUsername);

    expect(rachelValidation).to.equal('Oops! The username you have entered is invalid. Please try again.');
  });
});

describe('Password validation', () => {
  it('Should return true if password is valid', () => {
    const correctPassword = 'overlook2021';

    const validPassword = validatePassword(correctPassword);

    expect(validPassword).to.equal(true);
  });

  it('Should return a message if password is invalid', () => {
    const incorrectPassword = 'greatpassword2023';

    const invalidPassword = validatePassword(incorrectPassword);

    expect(invalidPassword).to.equal('Oops! The password you have entered is invalid. Please try again.');
  });
});