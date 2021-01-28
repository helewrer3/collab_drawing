# Collaborating Drawing App
A small little drawing webapp made using [Socket.io](https://socket.io/) and [NodeJS](https://nodejs.org/en/) where users can collaborate with their teammates/friends to make designs and/or have fun!

### The app has been deployed on [Heroku](https://sketchewrer3.herokuapp.com/)!

## Technologies Used
+ NodeJS
+ Express
+ Canvas
+ Socket&#46;io
+ HTML, CSS, Javascript

## Usage
Upon entering, you will be assigned a random color to your pen. \
To collaborate with others, share them your URL and then they will be able to access your artboard from there on.

## Deploying Locally
Simply clone the repo locally and run the following commands at the root of the project - 
```
npm install
npm start
```
Log into the port number 3000 or whatever port number you have set as your environment variable of node.

### Dependencies
To run this app locally, you need to have [NodeJS](https://nodejs.org/en/) installed in your system.

## Todo
+ Dynamic resizing of canvas, currently the canvas size is limited to the dimensions your browser had when you first entered the site.
+ Pen color picker
+ Eraser

## Expandability
+ Currently the app does not work on mobile devices, so a functionality for the same can be added in the future.
+ A web framework like Angular, React etc can be implemented to make the front-end even more appealing to the eyes.
