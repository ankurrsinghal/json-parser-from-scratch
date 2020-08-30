const {
    IS_WHITESPACE,
    IS_CURLY_BRACE_OPEN,
    IS_CURLY_BRACE_CLOSE,
    IS_CURLY_QUOTE,
    IS_COLON,
    IS_COMMA,
    IS_NUMBER,
    BRACE_OPEN,
    BRACE_CLOSE,
    COLON,
    COMMA,
    IDENTIFIERS,
} = require('./constants');

const tokenize = (json) => {
    let cursor = 0;
    const tokens = [];

    while (cursor < json.length) {
        const input = json[cursor];

        if (IS_WHITESPACE.test(input)) {
            cursor++;
            continue;
        }

        if (input === IS_CURLY_BRACE_OPEN) {
            tokens.push({
                type: BRACE_OPEN
            });
            cursor++;
            continue;
        }

        if (input === IS_CURLY_BRACE_CLOSE) {
            tokens.push({
                type: BRACE_CLOSE
            });
            cursor++;
            continue;
        }

        if (input === IS_COLON) {
            tokens.push({
                type: COLON
            });
            cursor++;
            continue;
        }

        if (input === IS_COMMA) {
            tokens.push({
                type: COMMA
            });
            cursor++;
            continue;
        }

        if (input === IS_CURLY_QUOTE) {
            let str = "";

            while (json[++cursor] !== IS_CURLY_QUOTE) {
                str += json[cursor];
            }

            tokens.push({
                type: IDENTIFIERS,
                value: str
            });

            cursor++;
            continue;
        }

        if (IS_NUMBER.test(input)) {
            let str = input;

            while (IS_NUMBER.test(json[++cursor])) {
                str += json[cursor];
            }

            tokens.push({
                type: IDENTIFIERS,
                value: parseInt(str, 10)
            });

            cursor++;
            continue;
        }

        throw new Error(`Invalid keyword: ${json[cursor]}`);
    }

    return tokens;
};

module.exports = { tokenize };