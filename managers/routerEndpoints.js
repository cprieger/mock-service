/**
 * A module for binding our managers to their http endpoints.
 *
 * @module managers/routerEndpoints
 */
const express = require('express');
const router = express.Router();

const logging = require('trivial-logging');
logging.init({debug: true});
const logger = logging.loggerFor(module);

const PeopleManager = require('./people.js');

router.get('/', async (req, res) => {
    return res.send('Hello World!');
});

router.get('/project', async (req, res) => {
    /**
     * TODO: For production use please safely use these filters.
     * This is a little unsafe and I just wanted to note that
     * even though i'm not using it.
     */
    const filters = req.body.filters;
    return res.send(await PeopleManager.getProject(filters));
});

router.get('/people', async (req, res) => {
    const filters = req.body.filters;
    return res.send(await PeopleManager.getPeoples(filters));
});

/**
 * Endpoint for getting a matchup. If using database identifiers would be passed
 * in and sent to the gets. For now we are just going to assume we only
 * are ever doing this one thing.
 */
router.get('/matchup', async (req, res) => {
    const filters = req.body.filters;
    return res.send(await PeopleManager.getMatchup(filters));
});

logger.debug('Endpoints were set.');

module.exports = router;