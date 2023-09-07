import chai from 'chai';
const expect = chai.expect;
import { sampleData } from '../src/sample-data'
import {
  convertOneToTwoDigits,
  configLongDate,
  configShortDate,
  sortByDate
} from '../src/bookings'


describe('Dates', () => {
  it('Should return a 2-digit number, given a 1-digit number', () => {
    const month = 6;
    const convertedMonth = convertOneToTwoDigits(month);
    expect(convertedMonth).to.equal('06');
  });

  it('Should return the same number, given a 2-digit number', () => {
    const day = 29;
    const convertedDay = convertOneToTwoDigits(day);
    expect(convertedDay).to.equal(29);
  });

  it('Should return the same number, given a number with more than 2 digits', () => {
    const year = 2023;
    const convertedYear = convertOneToTwoDigits(year);
    expect(convertedYear).to.equal(2023);
  });
  
  it('Should return a long date in the short format', () => {
    const longDate = 'June 29, 2023';
    const dataDate = configLongDate(longDate);
    expect(dataDate).to.equal('2023/06/29');
  });

  it('Should return a different long date in the short format', () => {
    const longDate = 'September 7, 2023';
    const dataDate = configLongDate(longDate);
    expect(dataDate).to.equal('2023/09/07');
  });

  it('Should return a short date in the long format', () => {
    const shortDate = '2023/06/29';
    const displayDate = configShortDate(shortDate);
    expect(displayDate).to.equal('June 29, 2023')
  });

  it('Should return a different short date in the long format', () => {
    const shortDate = '2023/09/07';
    const displayDate = configShortDate(shortDate);
    expect(displayDate).to.equal('September 7, 2023')
  });

  it('Should sort a user\'s bookings in reverse chronological order', () => {
    const leathasBookings = sampleData.customers[0].bookings;
    const sortedBookings = sortByDate(leathasBookings);
    expect(sortedBookings).to.deep.equal(sampleData.leathasBookingsSorted);
  });
});