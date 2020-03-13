# **Mock Service** 
A NodeJS service using express to 

Written by: Christopher P. Rieger <www.github.com/cprieger>
## Running 
### Command Line Only
* install dependencies use `npm ci`
* Run the server with `npm start`
* If you prefer to be manual `node server.js`.

### Docker
Please see the DOCKERFILE at the root of the project for what configuration was used.

* Build the docker first. `npm build-docker`
* Run the docker. `npm run-docker`
* Stop the docker by running in the command line `docker stop <container-name>`

That is it. Now there is just a service running at http://localhost:1338/

We use 1338 because the express app just ran locally uses 1337.
In case you wanted to run one or the other or both. 

### Interrogation
If you want to see what the end points are returning for the UI to consume I suggest using Postman. 
The endpoints (with docker) are 
* http://localhost:1338/peoples
* http://localhost:1338/project
* http://localhost:1338/matchup

The endpoints (with cli) are
* http://localhost:1337/peoples
* http://localhost:1337/project
* http://localhost:1337/matchup

### Documentation
To generate documentation we are using esdoc in our dev environment. 
If you would like to see them run `npm generate-docs`

Open ./docs/index.html in a browser. 
## TODO: 
Needs continuous integration hooked up. 