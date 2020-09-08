# Case study 7: NPM library package built with TypeScript

## Requirement and features of an NPM+TypeScript library

Node provides a JavaScript runtime with extensive supporting API by which
JavaScript (and by extension, TypeScript) programs can access facilities of the
underlying operating system. Because Node programs can be comprised of more than
one file, node also provides a facility, the "require" built-in function, for
loading more code.

The require implementation includes an algorithm for where to look for files,
and that algorithm relies on both file extensions, paths, and package.json
files. Further, it looks into directories named node_modules, and recursively
looks "upward" to containing folders.

But it doesn't define how any of those files came to exist.

npm is a package manager, which began outside of Note itself. In the early days
of Node, there were multiple competing approaches to package management, and
eventually npm prevailed.

npm (and some other competing implementations of approximately the same idea)
manipulate the contents of the node modules directories to cooperate with the
package look up capability of Node itself.

## Build and bundling process

Simple npm packages are typically handcrafted with a text editor. For anything
complex, some kind of build process is almost always used.

An npm package/library might be coded with hundreds or thousands of individual
files. These files are individually shipped to consumers, at sufficient scale
this can result in a noticeable slowdown.

### Rollup - for large libraries

For this reason, large and complex npm libraries tend to be "rolled up" into one
or a small number of JavaScript files before publishing. The most popular tool
for this is rollup, although many others are available and work.

https://rollupjs.org/guide/en/

Look at the TS library as an example:

https://unpkg.com/browse/@angular/core@10.0.11/fesm2015/

## Publishing a npm package

1. Create an npm account (if you don't have one).
1. `npm login`
1. `npm publish` (if repo has a scope, `npm publish --access public`)

A "prepublish" script can run a build before publishing.

## Consuming a npm package

(Look back at example 3)

## Ensure types arrive with executable code

"declaration": true

To see this in action, we will run the build of our example, and look at the
output.

## Developing a package with a consumer

npm link

npm link **\_**

npm unlink

## Dealing with different TypeScript versions

Most libraries, even if written TypeScript, don't actually rely on TypeScript to
be used. In those cases where TypeScript really is vital, use a "peer
dependency", not a production dependency, on the TypeScript version you need.

Because TypeScript has improved greatly over the last few years, and keeping in
mind that it does not use the "semantic versioning" specification, it is often
necessary to use a specific older version of a library to work with an older
version of TypeScript.

Some libraries publish old versions tagged with the version of TypeScript they
are compatible with.

## Package formats

What if a TypeScript / Node library is really an Angular library?

Building atop the base requirements for a npm package, some teams have made
additional, more robust package specifications for additional files, how files
are named and located, etc. The best example of this we are aware of is the
Angular Pack gauge Format, published by the Angular team at Google.

This idea might catch on more in the coming years.

# Tooling, ecosystem and other topics

## Operating system impact

The choice of Windows, Linux, Mac affects your node development
cycle; we'll discuss it.

Windows is generally okay in deployment, because the impact is worse on startup
or when repopulating your modules.

## IDEs

Many IDEs support Node, including Node with TypeScript. The most popular for
this appears to be Microsoft's Visual Studio Code. Recently they have added more
capability to the other Visual Studio IDE product to bring it closer to parity
with Code.

### Online IDEs

For years there have been online code editing widgets that make it easy to
experiment with JavaScript code in the browser. This idea has spread to
server-side coding also, including Node. There are various online IDEs to
work with this, the most powerful we are aware of is Microsoft's Visual Studio
Code Online.

### Debugging

Most robust IDE is provide the usual set of debugging tools, in the form of
breakpoints, watches, etc.

This is an area where Oasis Digital has relatively little experience - because
most of us here started learning and using these tools long before debugging
worked well. We have gotten in the habit of being productive with very little
use of the debugger.

## Node versions

Note as a platform continues to evolve quickly, yet simultaneously there are
many features which feel like they should have arrived long ago yet are still in
progress now. For example, not until Node 14 is it possible to immediately use
the new "import" style of loading other modules by default with no additional
settings.

We recommend keeping up with Node versions Node versions regularly. It is easy
to fall behind and eventually find great difficulty in jumping many versions at
once.

As with many other open source projects, only the even-numbered major versions
are stable, odd versions are development versions. We typically skip the odd
versions.

Be aware of the tool "NVM" (node version manager); this tool makes it very easy
to run many different versions of node, switch back-and-forth for testing, etc.

## NPM

As described above:

npm is a package manager, which began outside of Note itself. In the early days
of Node, there were multiple competing approaches to package management, and
eventually npm prevailed.

npm (and some other competing implementations of approximately the same idea)
manipulate the contents of the node modules directories to cooperate with the
package look up capability of Node itself.

### How types work

Library code typically has the compiled JavaScript in separate files from the
TypeScript types. The latter are in files ending in .d.ts, named and structured
in parallel to the JavaScript code they describe.

The package.json file points to the "root" of the types, similarly to how it
points to the “root” of the JavaScript code.

### How @types works

Although many JavaScript modules are either developed in TypeScript, or have
types maintained by the same people who maintain the JavaScript code, many other
libraries don't have any types available from their core developers.

As a result, to deal with this a mechanism has been defined so that types can be
maintained in parallel.

## The Node Ecosystem

The Node ecosystem is vast. We will discuss:

- How it compares with other ecosystems
- How to navigate the ecosystem, where to look for things
- How do you know who to listen to?
- How to tell if a project is still alive
- How to choose among the (often many) competing libraries to fill a need.

## Comparing deployment approaches

We covered many deployment options; let's discuss how they compare.

- Manually running “forever” or similar tool
- Set up as a OS-level Service (initd, upstart, launchd, etc)
- PM2
- Cloud Node host
- Docker container to a cloud hosting service
- Kubernetes

## Performance

### Straight-line execution

JavaScript is surprisingly fast. At runtime, TypeScript is JavaScript. Most
Node-based systems have many other bottlenecks other than Node execution speed.

However, for some kinds of work JavaScript is really not fast at all. Don't
expect Node to take over all kinds of server-side work.

### Scaling to more than one process/thread

The most obvious limitation of Node is that each Node process has just a single
thread. It does not natively multithread like Java, C#, and many other
alternatives.

To get past this, projects use some higher layer to orchestrate many
simultaneous Node processes executing. Some of the tools we discuss in the
Deployment sections can be used for this purpose.

### Scaling to multiple servers

Node is on a more level playing field field with Java, C#, etc. once multiple
servers are in use. All of the usual ways of scaling out the system to many
servers apply similarly to Node. Again, some of the deployment mechanisms we
have already discussed can be used for this purpose, and each major cloud
provider has solutions that manage multi-server scaling easily.

Of course, scaling CPUs is the easy part. The difficult part is scaling shared
state.

### Consider an off-the-shelf work queue implementation

Many problems the first appeared to be scaling problems, turn out to be problems
of trying to do too much work all at the same time. Many of these situations are
more easily solved by cuing up work, typically with an off-the-shelf work queue
implementation.

## Micro-services

There is much to discuss on the topic of how a large system should be broken
into parts. Should there be one backend, with many copies running? Multiple
smaller backend code bases, with a smaller number of copies of each running? We
can discuss this at length; there are many micro service architecture
trade-offs.

https://martinfowler.com/articles/microservices.html

### Don’t reinvent the wheel

What's better than a service with a small implementation?

No implementation at all.

### Asynchronous microservices

There is a widespread perception that nearly all micro services should be small
standalone HTTP servers which synchronously perform operations when called,
often by calling other micro services.

Often it makes more sense for micro services to be more loosely bound, for
example loosely bound in space and time. One service might write something to a
queue, not knowing or caring when another service will pick it up and act on it.

Here is an example of a piece of off-the-shelf Node based infrastructure which
makes such queue very easy to implement.

https://github.com/davedoesdev/qlobber-fsq

## Build processes

As mentioned in the section about rollup, most simple Node projects don’t need
any build process at all.

Going up to a slight amount of complexity, as is shown in our example, the
TypeScript compiler itself provides all the build that is needed for simple
libraries.

Going beyond that, something like rollup can be used to combine lots of code
from many files into a smaller number of files to ship.

Our monorepo example showed even more complex tooling, which unifies client and
server builds.

At the most extreme, we have worked with Bazel for highly scalable build
processes, for systems comprised of highly numerous subsystems written in many
different languages.

A word of advice; for most small to medium-sized projects, you can usually get
by writing little or no code for the build mechanism yourself. For example,
consider the following piece of tooling, which provides sufficient TypeScript
build capability for many projects.

https://tsdx.io/

## Code quality tooling

### ESLint

ESLint started out as a code quality tool for JavaScript, but through the use of
some plug-ins is now the official solution for TypeScript code also.

See out examples for configurations of it in use.

### TSLint (deprecated, but still used)

Until last year, TSLint was the common and standard tool for limiting a
TypeScript code base. It is still in wide use, although it is now deprecated and
no longer under active development.

Either way, a lint tool can further multiply the code quality and safeguard
features of using TypeScript.

### Prettier

All of our examples we show here, and most of the TypeScript code we work on in
production, is formatted using Prettier.

Removing code layout discussions as a topic of code review is a significant
savings of effort and reduction of sources of conflict. Yet the valuable
property of code looking the same no matter who typed it, is preserved and
enhanced.

### Code Coverage

We did not demonstrate a code coverage tool here, but these tools are available
for TypeScript and are as valuable here as with any other language.

## Migrating to Node

Migrating / moving from other tech / comparison

- Comparison to Java, spring, Hibernate
- Comparison to C# , Entity Framework
- Etc

What are all the main pieces of a typical CRUD enterprise server? Ask the
developers in the room what their stack is, and help them look for Node
equivalents, replacements, or alternative approaches.

# Wrap up

## Revisit and elaborate on topics at student request
