import chai from 'chai';
const expect = chai.expect;
import { sampleData } from '../src/sample-data'
import {
  parseUserID,
  validateUsername,
  validatePassword
} from '../src/bookings'

describe('Username validation', () => {
  const customers = sampleData.customers;
  const leathasUsername = 'customer1';
  

  it('Should return a user\'s ID given their login username', () => {
    const leathasID = parseUserID(leathasUsername);
    expect(leathasID).to.equal(1);
  });

  it('Should be able to return a 2-digit user ID', () => {
    const bellsUsername = 'customer21';
    const bellsID = parseUserID(bellsUsername);
    expect(bellsID).to.equal(21);
  });

  it('Should return true if the username is valid', () => {
    const leathaValidation = validateUsername(customers, leathasUsername);
    expect(leathaValidation).to.equal(true);
  });

  it('Should return a message if username is not valid', () => {
    const elephantsUsername = 'elephant40';
    const elephantValidation = validateUsername(customers, elephantsUsername);
    expect(elephantValidation).to.equal(false);
  });

  it('Should be case sensitive', () => {
    const rachelsUsername = 'cUsTomeR6';
    const rachelValidation = validateUsername(customers, rachelsUsername);
    expect(rachelValidation).to.equal(false);
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
    expect(invalidPassword).to.equal(false);
  });

  it('Should be case sensitive', () => {
    const bigPassword = 'OVERLOOK2021';
    const bigValidation = validatePassword(bigPassword);
    expect(bigValidation).to.equal(false);
  })
});