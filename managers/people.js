/**
 *  @module managers/people
 */

const logging = require('trivial-logging');
logging.init({debug: true});
const logger = logging.loggerFor(module);

/**
 * Engines are places where some work can be done. Typically we want them
 * primarily for payload verification. I would probably put matchup in a
 * utility file generally. But I wanted to show some of this architecture
 * correctly.
 *
 */
const matchupEngine = require('../engines/matchup');
/**
 * Resource Access is responsible for formatting and getting
 * the data in a way that we want. It is the real workhorse generally.
 * @type {Project}
 */
const projectRA = require('../resource-access/project');

/**
 * Peoples Resource Access
 * @type {People}
 */
const peoplesRA = require('../resource-access/people');

/**
 * People manager
 */
class PeopleManager {
    async sayHello() {
        return 'Hello World!'
    }

    async getProject(filters){
        return projectRA.get(filters);
    }

    async getPeoples(filters){
        return peoplesRA.get(filters);
    }

    async getMatchup(filters) {
        /**
         * This needs to be handled better.
         * TODO: refactor. This is actually insecure. filters could be passed in as a boolean.
         * @type {*|{}}
         */
        filters = filters || {};
        const project = await projectRA.get(filters);
        const people = await peoplesRA.get(filters);
        logger.trace(`project: ${project}, people: ${people.length}`);
        //In the near future I will have filters?.radius... soon... yes sooon.
        return await matchupEngine.score(project, people, filters.radius ||  100);
    }
}

module.exports = new PeopleManager();