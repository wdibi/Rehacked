const util = require('util');
const { FunctionDeclaration } = require('../ast');

function doCheck(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

module.exports = {
  isNotVariableTypeMismatch(type, expression) {
    doCheck(
      type.id === expression.type.id,
      `expression of type ${util.format(
        expression.type.id
      )} not compatible with type ${util.format(type.id)}`
    );
  },

  argsMatchParameters(args, params) {
    doCheck(
      args.length === params.length,
      `function expects ${params.length} args, but received ${args.length}`
    );
    args.forEach((arg, i) =>
      this.isNotVariableTypeMismatch(params[i].type, arg)
    );
  },

  isFunction(value) {
    doCheck(
      value.constructor === FunctionDeclaration,
      `non-existing function called`
    );
  },

  withinFunction(context) {
    doCheck(context.currentFunction !== null, `not within a function`);
  },

  returnMatchesFunctionReturnType(returnExpression, functionContext) {
    doCheck(
      returnExpression.type === functionContext.returnType,
      `returns ${util.format(
        returnExpression.type
      )}, but function expects ${util.format(functionContext.returnType)}`
    );
  },
};
