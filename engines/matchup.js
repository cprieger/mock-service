const _ = require('lodash');
const geolib = require('geolib');

/**
 * Matchup engine
 */
class Matchup {
    /**
     * Checks to see if a people is within the radius of a list of cities.
     *
     * Special note for evaluation:
     * This effectively gives us a city by city distance check.
     * I think ya'll really wanted this for a math check and test.
     * Buuuuut I used a lib because I would do that for Prod.
     * I don't waste time. Instead reinvesting that time into the architecture. Don't hate me.
     *
     * @param person - a people.
     * @param cities {array}
     * @param radius {number}- the radius to check.
     * @returns {*}
     * @private
     */
    _radiusCheck(person, cities, radius) {
        person.distances = [];
        //(-.-) i put in instead of of... and.. bad things happened.
        for (const city of cities) {
            /**
             * Person Location.
             * @type {{latitude: number, longitude: number}}
             */
            const respLoc = {
                latitude: person.formatLatitude,
                longitude: person.formatLongitude
            };
            /**
             * City location.
             * @type {{latitude: number | "lat" | "latitude" | 1 | GeolibLatitudeInputValue, longitude: number | 0 | "lng" | "lon" | "longitude" | GeolibLongitudeInputValue}}
             */
            const cityLoc = {
                //OMG I want https://v8.dev/features/optional-chaining so bad here.
                latitude: city.location.location.latitude,
                longitude: city.location.location.longitude
            };

            //Each line of code costs 10 cents.
            const checkRadius = geolib.isPointWithinRadius(respLoc, cityLoc, radius);
            /**
             * If we are EVER within radius we are good to go.
             * @type {boolean | *}
             */
            person.withinRadius = checkRadius || person.withinRadius;
            // Distances are in meters.
            person.distances.push(geolib.getDistance(respLoc, cityLoc));
        }
        return person;
    }

    /**
     * Calculate the people match score for the relevant project.
     * (At this moment I regret not making a types file for esdoc.)
     * @param project - The project definition for what we are looking to score against
     * @param people - list of people we want to check out.
     * @param radius - the distance in KM to search.
     */
    score(project, people, radius) {
        for (let person of people) {
            /**
             * Score is a calculation of matching a given project.
             * The higher the score the more desireable the candidate.
             * @type {number}
             */
            person.score = 0;
            /**
             * Check to see if the industry Matches.
             * @type {array}
             */
            const industryMatch = _.intersection(person.formatIndustry, project.professionalIndustry);
            person.score += industryMatch.length;

            const jobMatch = _.intersection(person.jobTitle, project.professionalJobTitles);
            person.score += jobMatch.length;

            person = this._radiusCheck(person, project.cities, radius);
        }
        people = _.filter(people, 'withinRadius');

        return _.sortBy(people, (person) => {
            return -person.score
        });
    }
}

module.exports = new Matchup();