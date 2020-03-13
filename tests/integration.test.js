/**
 * @jest-environment node
 */

/**
 * Integration testing. I would generally do this externally in a seperate test harness
 * project but I want to conserve some energy. I thought about dockerizing both
 * but that would be madness...
 */

const axios = require('axios');

/**
 * Please use the docker to run this test. This is meant to be external to this project.
 */
describe('People Mock Service Local Docker Service Testing', () => {
    test('We can say hello.', async () => {
        //lol first time using it give me a minute.
        expect('Hello World!').toBeTruthy();
    });

    test('Service Responds.', async () => {
        //Omg.. so if you are using jest and you make an integration test...
        //it means you have to include @jest-environment at the top.
        //Only found this because of this github issue https://github.com/axios/axios/issues/1754
        await axios.get('http://localhost:1338/')
            .then((response) => {
                expect(response.data).toBeDefined();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    test('Service Responds "Hello World!".', async () => {
        //Omg.. so if you are using jest and you make an integration test...
        //it means you have to include @jest-environment at the top.
        //Only found this because of this github issue https://github.com/axios/axios/issues/1754
        await axios.get('http://localhost:1338/')
            .then((response) => {
                expect(response.data).toEqual('Hello World!')
            })
            .catch((err) => {
                console.log(err);
            });
    });


    test('To have peoples.', async () => {
        await axios.get('http://localhost:1338/people')
            .then((response) => {
                expect(response.data).toBeDefined();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    test('To have 500 peoples.', async () => {
        //This is where we would generally hook up params. This isn't actually
        //hooked up. o7
        await axios.get('http://localhost:1338/people', {
            params: {
                filters: {city: 'Philadelphia'}
            }
        })
            .then((response) => {
                expect(response.data).toHaveLength(500)
            })
            .catch((err) => {
                console.log(err);
            });
    });

    test('To have a project.', async () => {
        await axios.get('http://localhost:1338/project')
            .then((response) => {
                expect(response.data).toBeDefined();
            })
            .catch((err) => {
                console.log(err);
            });
    });

    test('To have a project with cities.', async () => {
        await axios.get('http://localhost:1338/project')
            .then((response) => {
                //Lets make sure the properties we need for the service to work are there.
                expect(response.data.cities).toBeDefined();

            })
            .catch((err) => {
                console.log(err);
            });
    });

    test('To have a project with Industries.', async () => {
        await axios.get('http://localhost:1338/project')
            .then((response) => {
                //We can even check that it is an array that has length.
                expect(response.data.professionalIndustry.length).toBeGreaterThan(0);
            })
            .catch((err) => {
                console.log(err);
            });
    });

    /**
     * This is always the most fragile of tests. We would create
     * mock data for this in the real world. But for now this ensures
     * our service is working 100%.
     *
     * Why is that important? Because we want to ensure refactoring the
     * functions yield the same exact result. We will go into more
     * detail in just a minute in the unit tests.
     */
    test('To have an expected response.', async () => {
        await axios.get('http://localhost:1338/matchup')
            .then((response) => {
                //We can even check that it is an array that has length.
                // expect(response.data).toHaveLength(0);
                expect(response.data).toHaveLength(430);
            })
            .catch((err) => {
                console.log(err);
            });
    })
});