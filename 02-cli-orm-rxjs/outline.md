# Case study 2: Command line data manipulation application using an ORM and RxJS

Next we will work with a Node command line program. This will form a useful
context to introduce more techniques, tools, etc.

We also see Node in use here outside of the web context. It is a general-purpose
programming runtime for the general-purpose JavaScript (and TypeScript)
programming languages. It can be used for most any kind of software including
something like a command line tool in lieu of Python, Ruby, Bash, etc.

## Parsing command line options

Briefly show the built-in API for command line parsing, but don’t even bother to
use it for even a simple application, because it is such a bad idea.

### CLI options libraries

yargs: one of the popular choices, we use it here in the example

## Using a database

### RDBMS (PostgreSQL)

Of course the most common kind of database in the world is a general-purpose
relational database. We will see one of those and use later, but for now it is a
lot of complexity to get up and running.

### NoSQL (Mongo, etc)

NoSQL databases are very popular, and there is sometimes a tendency to think
there is some important connection between NoSQL and JavaScript, but there
really isn't any. You are you can mix-and-match technologies to meet specific
project needs.

### sqlite

This library brings much of the syntax and semantics of a traditional relational
database, but in the form of a library easily consumed inside a piece of
software. You can think of it as the meeting point between a database and a file
format.

We use it here, to get the semantics with minimal set up.

## ORM

### Sequelize

This library gained popularity early, but we don't recommend it for use with
TypeScript. Its usage patterns are full of JavaScript-isms, that are not readily
amenable to typing and IDE assistance.

### TypeORM

TypeORM is a very TypeScript-friendly ORM, with syntax and semantics very
familiar to users of hibernate, entity framework, and numerous other similar ORM
tools.

## RxJS

A recurring theme across Oasis Digital classes: the ecosystem is full of tools
that are typically thought of as being useful in one context. For example, RxJS
is typically thought of as being used inside Angular. But RxJS is useful far
beyond that context.

We'll see an example in this code of using RxJS to concisely manage limited
concurrency in a Node application.

## Node streams

While RxJS is a great general purpose abstraction for data streams, there is
also a Node-specific mechanism for streams. We won't see this in the example
code, but you should be aware of it, in particular older libraries sometimes it
to incrementally provide data.

## Preparing code for reuse

Code reuse is hard.

In this example, we will look at several constructs to help enable code reuse,
via modularity. First, the functionality core is implemented in TypeScript, in
code that looks like a library. It's entry point is just a function or two.

Next, a TypeScript command line driver sits in front of that, to expose that
same functionality to easy CLI use.

Next, a very thin JavaScript-only shim sits in front of that, to meet the npm
package construction requirements for CLI tools - yet without moving more than a
couple lines of code outside the safety of TypeScript.

## Unit Testing

Our example has a few unit tests; were not going to introduce all of unit
testing and other testing in depth here, but rather just connect to what most
attendees already know.

### Jest

Jest includes its own test runner and test/assertion libraries. Jest seems quite
ascendant right now, undergoing adoption both by itself and as part of other
tools which integrate it. At work we have been introducing it whenever there is
an opportunity to upgrade testing tools; it encourages a fast cycle quite
easily, with less set up and less thinking than older testing tools.

We use Jest in our examples here.

### Mocha with Chai

For years this was the "standard" for nearly NO development. It combines a test
runner with a separate assertion library, and of course there are developers
with strong opinions about replacing one of the pieces was something different.∑

### Jasmine

Jasmine is an earlier full test stack solution; it seems to have waned in recent
years.

## Deployment as an NPM package with a "bin" entry

For a CLI application, deployment means making the code available for others to
easily deploy and use. NPM natively supports CLI applications - see the "bin"
entry and contents for details.

To actually publish, you'll need:

- npm account
- unique name (perhaps namespaced)
- `npm publish`

We'll talk about this more later, when we publish code intended to be used as a
library.
