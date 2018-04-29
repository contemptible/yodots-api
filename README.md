<h1 align="center">YODOTS: Your Online Drawer of Ticket Stubs</h1>
<p align="center"><a href="https://yodots.netlify.com/" target="_blank">(go to the live site)</a></p>

<h3>User Guide</h3>
<p>The Y.O.D.O.T.S. API can be used to create and manage a database of movies and movie reviews. Users can edit their usernames, the movies' titles, dates, star ratings, and reviews, as well as add and delete movie entries at will.</p>

<h3>Endpoints</h3>
<ul><strong>/login</strong>
<ul>POST<br />
Passing an object containing a user's email and password to this endpoint will return a token.</ul>

<strong>/users</strong>
<ul>POST<br />
Passing an object containing a username, email, and password to this endpoint will create a new user.</ul>

<strong>/users/:userId/movies</strong>
<ul>GET<br />
Retrieves all of userId's movies.</ul>

<strong>/users/:userId</strong>
<ul>PUT<br />
Passing a new username to this endpoint will update the username for the user with userId.</ul>

<strong>/users/:userId/movies</strong>
<ul>POST<br />
Passing a date and title to this endpoint will create a new movie for the user with userId.</ul>

<strong>/users/:userId/movies/:movieId</strong>
<ul>PUT<br />
Passing a new title, date, star rating, or review to  this endpoint will update that information for the movie with movieId.</ul>

<strong>/users/:userId/movies/:movieId</strong>
<ul>DELETE<br />
Accessing this endpoint will delete the movie with the ID movieId.</ul></ul>

<h3>Current Uses</h3>
<ul><li><a href="https://github.com/contemptible/yodots-web" target="_blank">The Y.O.D.O.T.S. app</a></li></ul>