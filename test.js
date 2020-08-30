const jsonParser = require('./src');

test('it should parse json and create a valid javascript object', () => {
    const json = `
        {
            "id": 1,
            "post_title": "Welcome to the world of parsing.",
            "author": {
                "name": "Ankur Singhal"
            }
        }
    `;

    const the_expected = JSON.parse(json);
    const the_actual = jsonParser(json);

    expect(the_expected).toEqual(the_actual);
});