const operationRules = {
  "GET UP (.+)": function(op1, op2) {
    return `${parseOperand(op1)} + ${parseOperand(op2)}`;
  },
  "GET DOWN (.+)": function(op1, op2) {
    return `${parseOperand(op1)} - ${parseOperand(op2)}`;
  },
  "YOU'RE FIRED (.+)": function(op1, op2) {
    return `${parseOperand(op1)} * ${parseOperand(op2)}`;
  },
  "HE HAD TO SPLIT (.+)": function(op1, op2) {
    return `${parseOperand(op1)} / ${parseOperand(op2)}`;
  },
  "YOU ARE NOT YOU YOU ARE ME (.+)": function(op1, op2) {
    return `${parseOperand(op1)} == ${parseOperand(op2)} ? 1 : 0`;
  },
  "LET OFF SOME STEAM BENNET (.+)": function(op1, op2) {
    return `${parseOperand(op1)} > ${parseOperand(op2)} ? 1 : 0`;
  },
  "CONSIDER THAT A DIVORCE (.+)": function(op1, op2) {
    return `${parseOperand(op1)} || ${parseOperand(op2)} ? 1 : 0`;
  },
  "KNOCK KNOCK (.+)": function(op1, op2) {
    return `${parseOperand(op1)} && ${parseOperand(op2)} ? 1 : 0`;
  }
};
const statementRules = {
  'TALK TO THE HAND "(.+)"': function(string) {
    return `print("${string}");\n`;
  },
  "TALK TO THE HAND (.+)": function(variable) {
    return `print(${variable});\n`;
  },
  "HEY CHRISTMAS TREE (.+)\n\s*YOU SET US UP (.+)": function(variableName, initialValue) {
    return `var ${variableName}  = ${parseOperand(initialValue)} ;\n`;
  },
  "GET TO THE CHOPPER (.+)\n\s*HERE IS MY INVITATION (.+)((.|\n)+)ENOUGH TALK": function(variableName, firstOperand, operationsText) {
    const operations = parse(operationsText, [], operationRules);
    const evaledOperations = _.reduce(operations, function(acc, curr) {
      curr.arguments.unshift(acc);
      return curr.statement.apply(undefined, curr.arguments);
    }, parseOperand(firstOperand)) + ';\n';
    return `${variableName} = ${evaledOperations};\n`;
  },
  "BECAUSE I'M GOING TO SAY PLEASE (.+)\n((.|\n)+)\nYOU HAVE NO RESPECT FOR LOGIC": function(variableName, statementsText) {
    const ifStatements = parse(statementsText.split('BULLSHIT')[0], [], statementRules);
    const elseStatements = parse(statementsText.split('BULLSHIT')[1], [], statementRules);
    return `if (${variableName}) {
      ${transpile(ifStatements)}
      } else {
      ${transpile(elseStatements)}
      }`;
  },
  "STICK AROUND (.+)\n((.|\n)+)\nCHILL": function(variableName, statementsText) {
    const statements = parse(statementsText, [], statementRules);
    return `while (${variableName}) {
      ${transpile(statements)}
      }`;
  }
};
const rootRules = {
  "IT'S SHOWTIME\n((.|\n)+)\nYOU HAVE BEEN TERMINATED":  function(statementsText) {
    const statements = parse(statementsText, [], statementRules);
    return `(function() {
      ${transpile(statements)}
      })();`;
  }
};

function parseOperand(variable) {
  switch (variable) {
    case "@I LIED":
      return 0;
    case "@NO PROBLEMO":
      return 1;
    default:
      return variable;
  }
}

function nextStatement(program, rules) {
  let foundStatement;
  _.keys(rules).
    forEach(function(statement) {
      const re = new RegExp(statement, 'm');
      const result = re.exec(program);
      if (result && (!foundStatement || foundStatement.index > result.index)) {
        foundStatement = {
          statement: rules[statement],
          match: _.first(program.match(re)),
          index: result.index,
          arguments: _.rest(program.match(re))
        };
      }
    });
  return foundStatement;
}

function parse(program, statements, rules) {
  const statement = nextStatement(program, rules);
  if (!statement) { return statements; }
  const rest = program.substring(statement.index + statement.match.length);
  statements.push(statement);
  return parse(rest, statements, rules);
}

function transpile(statements) {
  return _(statements).reduce(function(generatedSource, curr) {
      return generatedSource + curr.statement.apply(undefined, curr.arguments);
    }, '');
}

function transpileArnoldC(program) {
  const statements = parse(program, [], rootRules);
  return transpile(statements);
}

module.exports = transpileArnoldC;
