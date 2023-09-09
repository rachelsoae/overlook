# Overlook
## [Enter Site Here](https://rachelsoae.github.io/overlook/)
#### To Log In:
- Username: customer[*input any number between 1 and 50*], example `customer21`
- Password: `overlook2021`

![preview of booking feature](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjY5NWQ1Njc1YTQ4OGVlNTAyMzZjNzQxMzgwNWU4NjA4NzExMmE2NCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/XM2JngU2hKNuC5PqmW/giphy.gif)

### Abstract:
[//]: <> (Briefly describe what you built and its features. What problem is the app solving? How does this application solve that problem?)
Enjoy peace and luxury at The Overlook!
This hotel booking site allows a user to log into a beautiful personalized dashboard with a record of all their past bookings at The Overlook, including dates and room details. 
Search for available rooms by desired check-in date, and filter search results by the type of room you want. 
Once a room is selected, you may confirm your booking or return to your previous search results to change the details of your stay.

### Contributors:
[//]: <> (Who worked on this application? Link to their GitHubs.)
[Rachel Soae Prather](https://github.com/rachelsoae)

### Installation Instructions:
[//]: <> (What steps does a person have to take to get your app cloned down and running?)
1. Clone this respository down to your machine
1. Run `npm install` or `npm i`
1. Run `npm start`
1. In your browser, navigate to [localHost:8080](http://localhost:8080/)
1. Keep the client running in the terminal in order to view the site. `Ctrl + C` to close the client.
1. To run unit tests, run `npm test` from the `overlook` directory 

### Tech
#### Build:
- Vanilla JavaScript
- HTML
- CSS
- Webpack
- Mocha/Chai
- Fetch Web API
- [flatpickr](https://flatpickr.js.org/) via NPM for date selection

#### Accessibility Testing:
- [WAVE Evaluation Tool](https://wave.webaim.org/)
- Lighthouse
- [Colorblind - Dalton](https://chrome.google.com/webstore/detail/colorblind-dalton-for-goo/afcafnelafcgjinkaeohkalmfececool)
- VoiceOver

### Learning Goals:
[//]: <> (What were the learning goals of this project? What tech did you work with?)
This project centered around the creation of a fully accessible UI/UX. Accessible features include line-by-line tabbability of all informational and interactive features and full screen reader compatibility. Functionally, the focus was to integrate and utilize API data to develop a personalized and user-friendly web experience. 

The current product is the result of 32 hours of work including planning, testing, and implementation. Project was managed through use of GitHub Projects and GitHub Issues. Assets are opensource via [unsplash](https://unsplash.com/).

This build has been extremely gratifying in terms of solidifying my understanding of Fetch and giving me the opportunity to focus on accessibility. The most challenging feature to build was the confirmation page overlay. Not only is it a design feature I have not tried before, but required me to deepen my underestanding of `tabindex` in order to make sure that the feature is useable for folks of all abilities. Time management also remains an ongoing practice; there are many features I would like to add that will require my time in the future.

My favorite feature, though it's small, is that you can click on the overlay to exit out of the overlay box (or you can click the exit button), and your previous search results will still be there. If you booked one of the rooms, the search results are updated so that the room no longer appears as available. Although it sounds small, having this change instantaneously really added to the finesse of the UI.

### Plans for the Future:
A few features and UI improvments I plan to implement:
- [x] Sort Dashboard bookings by date, so that most recent displays on top
- [ ] Separate Dashboard into "Past" and "Upcoming" bookings sections
- [ ] Use visual overlay to display username/password validation messages
- [ ] Add confirmation number to "Thank You" confirmation message
- [x] Reformat dates into "Month Day, Year"
