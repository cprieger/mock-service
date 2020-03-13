/**
 * This is the main entrypoint.
 * @module root/server
 */

const express = require('express');
/**
 * This is a security library that goes in and fixes some vulns in express.
 * You said Prod ready. Security matters ;).
 * @type {helmet}
 */
const helmet = require('helmet');

/**
 * Using a friends logger because I love it. Wrapper around Pino.
 *
 * @type {{TrivialLogging: TrivialLogging} | TrivialLogging}
 */
const logging = require('trivial-logging');
logging.init({debug: true});
const logger = logging.loggerFor('module');

const RouterEndpoint = require('./managers/routerEndpoints.js');
const bodyParser = require('body-parser');

/**
 * No defaults here we are 2 legit 2 quit for that.
 * @type {number}
 */
const PORT = 1337;
const app = express();

/**
 * Helmet is instantiating it's defenses here.
 */
app.use(helmet());
/**
 * We really just want to talk in JSON. We aren't animals.
 */
app.use(bodyParser.json());
app.use(RouterEndpoint);

app.listen(PORT, () => {
    logger.info(`mock-service listening on port: ${PORT}`, );
});