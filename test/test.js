QUnit.test("invalid statements raise parse error", function(assert) {
  assert.throws(
    function() {
      arnoldC.exec("invalid\nIT'S SHOWTIME\n\nYOU HAVE BEEN TERMINATED");
    },
    "raises parse error"
  );
});

QUnit.test("ignores whitespace", function(assert) {
  var context = arnoldC.exec("      IT'S SHOWTIME\nTALK TO THE HAND \"hello world\"\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "hello world\n");
});

QUnit.test("print string", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nTALK TO THE HAND \"hello world\"\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "hello world\n");
});

QUnit.test("set variable to constant", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 1\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("set variable to variable", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 1\nHEY CHRISTMAS TREE b\nYOU SET US UP a\nTALK TO THE HAND b\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("set variable to true", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP @NO PROBLEMO\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("set variable to false", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP @I LIED\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "0\n");
});

QUnit.test("print variable", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 1\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("assign variable", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 1\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("addition", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 1\nGET UP 1\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "2\n");
});

QUnit.test("subtraction", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 2\nGET DOWN 1\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("multiplication", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 2\nYOU'RE FIRED 2\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "4\n");
});

QUnit.test("division", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 4\nHE HAD TO SPLIT 2\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "2\n");
});

QUnit.test("multiple operations", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 4\nHE HAD TO SPLIT 2\nGET UP 2\nGET DOWN 1\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "3\n");
});

QUnit.test("equals", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 2\nYOU ARE NOT YOU YOU ARE ME 2\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("greater than", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 2\nLET OFF SOME STEAM BENNET 1\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("or", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 0\nCONSIDER THAT A DIVORCE 0\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "0\n");

  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 1\nCONSIDER THAT A DIVORCE 0\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");

  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 1\nCONSIDER THAT A DIVORCE 1\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");

  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 0\nCONSIDER THAT A DIVORCE 1\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("and", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 0\nKNOCK KNOCK 0\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "0\n");

  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 0\nKNOCK KNOCK 1\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "0\n");

  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 1\nKNOCK KNOCK 0\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "0\n");

  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nGET TO THE CHOPPER a\nHERE IS MY INVITATION 1\nKNOCK KNOCK 1\nENOUGH TALK\nTALK TO THE HAND a\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "1\n");
});

QUnit.test("branch statement", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nBECAUSE I'M GOING TO SAY PLEASE a\nTALK TO THE HAND \"a\"\nYOU HAVE NO RESPECT FOR LOGIC\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "");

  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 1\nBECAUSE I'M GOING TO SAY PLEASE a\nTALK TO THE HAND \"a\"\nYOU HAVE NO RESPECT FOR LOGIC\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "a\n");
});

QUnit.test("branch statement with else branch", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 0\nBECAUSE I'M GOING TO SAY PLEASE a\nTALK TO THE HAND \"a\"\nBULLSHIT\nTALK TO THE HAND \"b\"\nYOU HAVE NO RESPECT FOR LOGIC\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "b\n");

  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 1\nBECAUSE I'M GOING TO SAY PLEASE a\nTALK TO THE HAND \"a\"\nBULLSHIT\nTALK TO THE HAND \"b\"\nYOU HAVE NO RESPECT FOR LOGIC\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "a\n");
});

QUnit.test("while loop", function(assert) {
  var context = arnoldC.exec("IT'S SHOWTIME\nHEY CHRISTMAS TREE a\nYOU SET US UP 2\nSTICK AROUND a\nTALK TO THE HAND \"a\"\nGET TO THE CHOPPER a\nHERE IS MY INVITATION a\nGET DOWN 1\nENOUGH TALK\nCHILL\nYOU HAVE BEEN TERMINATED");
  assert.equal(context, "a\na\n");
});
