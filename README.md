# CouplesGoals
CouplesGoals is an app that allows people to collaboratively manage a list of goals. The purpose of CouplesGoals is to give me a concrete project to focus my learning on. Many people say that the best way to learn to program is by programming, so this is my take on that advice.

## Features
Not very many, ATM!

## Goals
The next step in the development of CouplesGoals is to add user authentication, and the ability to store data in an Sqlite or SQL server. Further goals include addinng the ability to create deadlines for Goals, as well as send notifications of upcoming deadlines. The ability to sort/filter goals by tags and deadlines is also on the horizon.

## Technology
CouplesGoals is currently implemented as a .net core API with a web app front-end. The current code uses an in-memory database. The front-end uses HTML, CSS, Javascript and a little JQuery. The goal is to transition to Sqlite and/or SQL server for the data and Angular for the frontend. Since this project is used mainly to help me expand my skills I'm planning to create front-ends for use on the desktop and mobile in addition to the web app.

### Current stack:
* asp.net core for the back-end (api)
* in memory database
* git for version control
* Deployed to Heroku via Docker container
* HTML, vanilla JS, and CSS (Materialize.css) for front-end
