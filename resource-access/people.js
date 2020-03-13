/**
 * People module.
 * @module resource-access/people
 */
const path = require('path');
const csvFilePath = path.join(__dirname, '/data/people.csv');
const csv = require('csvtojson');

const logging = require('trivial-logging');
logging.init({debug: true});
const logger = logging.loggerFor('module');

/**
 * A class for getting all of the people we have as data.
 * @class People
 */
class People {
    /**
     * Format the JSON objects to clean any data type issues.
     * Ideally in reality we would format this data on ingress.
     * Because this would be cheaper on the database.
     *
     * @param people {Object[]} - the people to filter
     * @returns {Object[]}
     * @private
     */
    async _format(people) {
        //very strange unit test bug here.
        // HAHAHAHA it is an async problem.
        people = people || [];
        /**
         * This array is a little redundant. Small waste of space. Could be optimized.
         * @type {Object[]}
         */
        let cleanArray = [];

        for (const person of people) {
            /**
             * Little bit of the old razzle dazzle here. I actually would not
             * suggest doing this here unless you can guarantee city is always
             * a three part comma separated string.
             * @type {string[]}
             */
            const cityArray = person.city.split(',');
            person.formatLatitude = parseFloat(person.latitude);
            person.formatLongitude = parseFloat(person.longitude);
            person.formatCity = cityArray[0].trim();
            person.formatState = cityArray[1].trim();
            person.formatCountry = (cityArray[2] || '').trim();
            person.formatIndustry = person.industry.split(',');
            cleanArray.push(person);
        }
        return cleanArray;
    }

    /**
     * Just a simple get we aren't going to hook up the filter
     * but this is something we would usually do (and I wanted
     * to show off the param documentation)
     * @param filters {Object} not used currently
     * @returns {Object[]}
     */
    get(filters) {
        /**
         * Add engine call here for making sure that _data is set..
         * kind of a waste of time so i'm just going to put a todo.
         */
        return csv().fromFile(csvFilePath).then((jsonObj) => {
            this._data = jsonObj;
            logger.debug('People loaded.');
            logger.trace(jsonObj);
            return this._format(jsonObj);
        });
        //TODONE: ensure data is set (future me) HAH knew it. blew the tests up
        //return this._format(this._data);
    }


}

module.exports = new People();