const projectRA = require('../resource-access/project');
const peopleRA = require('../resource-access/people');
const matchupEngine = require('../engines/matchup');
const logging = require('trivial-logging');
logging.init({debug: true});

describe('Project Resource Access', () => {
    test('Can get a project.', async () => {
        const project = await projectRA.get();
        expect(project).toBeDefined();
    });

    /**
     * Lots more of these tests just with more varying detail.
     * We don't want to get into testing if javascript works though.
     * We primarily care about the coverage this provides.
     */
    test('Projects have cities.', async () => {
        let project = await projectRA.get();
        expect(project.cities.length).toBeGreaterThan(0);
    });
});

describe('People Resource Access', () => {
    test('Can get people.', async () => {
        const people = await peopleRA.get();
        //This is a failed test. people is not set.
        //This needs to be fixed. But the architecture needs fixed.
        expect(people).toBeDefined();
    });

    /**
     * Lots more of these tests just with more
     */
    test('Can get 500 people.', async () => {
        const people = await peopleRA.get();
        //Because we put this test in we noticed a failure.
        expect(people.length).toBe(500);
    });
});

// We would also do a lot more here for checking properties on that object
// But I think we had some fun and caught some errors. I have an async
// problem that I predicted. Which felt pretty good.
// Thanks for letting me interview.


//came back for more punishment because I forgot a module.
describe('Matchup Engine Test', ()=>{
    /**
     * Now we need to test the private function we made.
     * it has a lot of logic. Will be very volatile.
     * note this looks a lot like our manager ;)
     * which we know actually works because of the integration tests
     * @test
     */
    test('Can get filtered correctly.', async () => {
        const project = await projectRA.get({});
        const people = await peopleRA.get({});
        const scoredPeople = await matchupEngine.score(project, people, 100);

        expect(scoredPeople.length).toBe(430);
    });

    /**
     * Breaking tells us more than anything.
     */
    test('Can be broken.', async () => {
        const project = await projectRA.get({});
        const people = await peopleRA.get({});
        const scoredPeople = await matchupEngine.score(project, people, 0);

        expect(scoredPeople.length).toBe(0);
    });
});
