# Usage:-

```
const json = `
    {
        "first_name": "Ankur",
        "last_name": "Singhal",
    }
`;

const { tokenize } = require('./tokenize');
const { parser } = require('./parser');

const tokens = tokenize(json);

// returns
[
    {
        "type": "BRACE_OPEN"
    },
    {
        "type": "IDENTIFIERS",
        "value": "first_name"
    },
    {
        "type": "COLON"
    },
    {
        "type": "IDENTIFIERS",
        "value": "Ankur"
    },
    {
        "type": "COMMA"
    },
    {
        "type": "IDENTIFIERS",
        "value": "last_name"
    },
    {
        "type": "COLON"
    },
    {
        "type": "IDENTIFIERS",
        "value": "Singhal"
    },
    {
        "type": "COMMA"
    },
    {
        "type": "BRACE_CLOSE"
    }
]

const data = parse(tokens);

```