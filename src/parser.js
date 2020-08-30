const {
	BRACE_OPEN,
	BRACE_CLOSE,
	COLON,
	COMMA,
	IDENTIFIERS,
} = require('./constants');

const parser = tokens => {
	let stackPtr = 0;
	const stack = [];
	const pojo = {};

	while (stackPtr < tokens.length) {
		const token = tokens[stackPtr];
		const top = stack[stack.length - 1];
		if (top && top.type === COLON) {
			if (token.type === IDENTIFIERS) {
				stack.pop();
				const key = stack.pop().value;
				const value = token.value;
				pojo[key] = value;
				stackPtr++;
				continue;
			}

			if (token.type === BRACE_OPEN) {
				const newTokens = [token];
				const newStack = [token];

				while (newStack.length !== 0) {
					const nextToken = tokens[++stackPtr];
					if (nextToken.type === BRACE_OPEN) {
						newStack.push(nextToken);
					}

					if (nextToken.type === BRACE_CLOSE) {
						newStack.pop();
					}
					newTokens.push(nextToken);
				}

				stack.pop();
				const key = stack.pop().value;
				const value = parser(newTokens);
				pojo[key] = value;
				stackPtr++;
				continue;
			}

			throw new Error(
				`Invalid json: ${(stackPtr, tokens.length)} ${JSON.stringify(token)}`
			);
		}

		if (token.type === COMMA) {
			stackPtr++;
			continue;
		}

		stack.push(token);
		stackPtr++;
	}

	return pojo;
};

module.exports = { parser };