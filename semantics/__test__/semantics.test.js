const parse = require('../../ast/parser');
const analyze = require('../analyzer');

const program = String.raw`
num x <- 2;
x <- 5;

addFive(num a) -> num
  return 5;
end

task updateX(num value)
  x <- value;
end

num y <- addFive(5);
updateX(3);
print "hello" + 5;
print x + 5;
print 'a' + 5;
// print 7 + 5 / 3 * 2;
print 10 - 6;
print 25 * 2;
print 20 / 4;

print !false;

print -12;
print -false;

x <- 3 * 2 / 9 + 8 - 200 ;
`;

describe('The semantic analyzer', () => {
  test('accepts the mega program with all syntactic forms', done => {
    const astRoot = parse(program);
    expect(astRoot).toBeTruthy();
    analyze(astRoot);
    expect(astRoot).toBeTruthy();
    done();
  });
});
