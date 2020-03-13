/**
 * Project module.
 * @module resource-access/project
 * @see module:resource-access/project
 */
const logging = require('trivial-logging');
logging.init({debug: true});
const logger = logging.loggerFor('module');

/**
 * For getting all of the projects we have as data.
 */
class Project {
    /**
     * Usually here we would have database connection information.
     * Since we are reading files we are going to use this moment to
     * load all of the data we need.
     * @constructor
     */
    constructor() {
        this._data = require('./data/project');
        logger.trace(this._data);
    }

    /**
     * Just a simple get we aren't going to hook up the filter
     * but this is something we would usually do (and I wanted
     * to show off the param documentation)
     * @param filters {Object} filters to limit data. Unused currently
     * @returns {{numberOfParticipants: number, timezone: string, cities: *, genders: string, country: string, incentive: number, name: string, professionalJobTitles: *, professionalIndustry: *, education: *}}
     */
    get(filters) {
        return this._data;
    }


}

module.exports= new Project();