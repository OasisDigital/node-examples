# Introduction and background

## Oasis Digital, student introductions

## Teaching via a series of case studies

We teach classes like this in a relatively holistic manner. We don't, for
example, first teach everyone the meaning of the TypeScript language and then
start applying it to a project. Rather, we go through a series of increasingly
complex examples, and at each stage introduce more concepts from:

- Node
- TypeScript
- System architecture
- Etc

In each example we see both the power of certain approaches and their
limitations. Then in later examples we address some of the issues of earlier
ones.

In the process, we incrementally introduce and expand upon many broader topics:

- Server and system architecture
- best practices
- development tooling for productivity
- Climbing the abstraction ladder to do more with less code

## Quick look at a full stack TypeScript project

At the very beginning of the class, after just a few minutes of introduction, we
will give a brief tour through one of the possible fully realized architecture
choices on a node.js/TypeScript full stack project. This might even include a
brief look at some code shared to a Angular front end, although this class is
not about the front-end.

The value of doing this at the beginning is to help students become more fully
engage and understand why it will now take extensive explanation piece by piece
to get there.

It is very important as an instructor to keep this brief, do not allow questions
asked here to cause you to start teaching the whole class during what is
supposed to be the third bullet point.

## Node origins, context, status

Where did Node come up? History and future.

## TypeScript origins, context, status

JavaScript / TypeScript

Find a good TS intro somewhere? NO, teach it inline as we go.

Find ways to motivate TS features in the context of the ideas we are teaching
about back-ends. Understanding that is in JS, and how that comes in to play for
running on Node.

## Choosing Node and TypeScript

Things to think about when choosing tech and designing a back-end:

- Error handing
- writing less code
- Create fewer layer / make very layer count
- Avoiding duplication
- Modularity
- Schema
- Dynamism
- Postel's law

backend API should follow this rule of widely accepting variation in data from
client, but closely guard what gets sent out. Rigorous in shape of outgoing
data.

- Adoption vs inventing
- Time and money matter - focus your innovation "budget"
- Could I use an off the shelf service instead?
- Could I use an off the shelf server instead
- Do I just need a database, not my own backend?
- Do I just need CRUD, or do I need more functionality?
- What technologies are my team and organization ready to embrace?

### Productivity

### Quality

### Community, training, and hiring

## Long-term productivity vs quick start

There is a temptation when learning a new platform, to just pick the easiest
pieces to get up and running. While the easiest path usually is the best way to
learn a new platform at the very beginning, it doesn't lead to an efficient,
productive end state.

It's not about how fast, with how little libraries, you get started. It's about
how fast you get finished. Meet all the requirements.

# Case study 1: A hand-rolled Node REST API server

This is our first example program to work with, and it will form a place to
discuss numerous early topics. It will be a simple, hand-rolled Node REST API
server.

Our API consists of two areas:

"Favorites", it manages a list of favorite websites.

"Words", it scrapes the content of a couple of popular websites looking for a
word.

## HTTP(S) handling and Express

It is possible to handle HTTPS in Node, but the set up is complex and more
importantly, it is not recommended by hardly anyone. Rather, if you use HTTPS
(which you probably should), it is wiser to have this provided by an
off-the-shelf, very well proven issue to be server proxying in front of your API
server. We most often use nginx.

### Express as infrastructure and vocabulary

Express provides a vocabulary (API) which sits underneath most Node systems, for
handling HTTP requests and coming from a client. Study the example to see a few
of the common parts.

## Outgoing HTTP(S)

Express is for incoming HTTP requests; sometimes you want to turn around and
make an outgoing HTTP request. There is a built-in set of Node primitives for
this, but they are inconvenient. Instead:

### Axios

Axios is the most popular node library for convenient and featureful HTTP operations.

## Data handling

### Raw/binary/text data

### JSON

## Old ways of dealing with asynchrony

### Callbacks

The express API, dating from early days of node, defaults to callback-based
APIs. We can see a couple of these in action in the example code.

### Promise.then()

Many JavaScript/TypeScript developers think of promises as a client-side tool.
Promises are also useful for many server operations, providing a much better
(although still somewhat awkward) syntax in lieu of callbacks.

### Superfluous new Promise() - use the Promise you have

Although we don't see this in the example (yet), it’s worth a mention.

## Modern asynchrony

### async-await

This syntax makes promises part of the language. It can be seen in action in our
word example.

### Promise composition

Promises can be composed, allowing multiple operations to proceed in parallel
yet without a thread API.

### async generators (introduction)

This advanced feature is outside the scope of our introductory content; but it
can pay off well in certain complex situations.

## Modularity

As much as possible throughout our code, we avoid the older common JS
require syntax and use the modern import export syntax.

### Export individual functions, classes, etc.

### Split code across files

## TypeScript

### tsconfig.json configuration

Initially using TypeScript with Node, the configuration we have in these
examples should require little or no attention. For a deeper understanding, or
as you work with more complex scenarios, someone on each project will likely end
up quite familiar with the documentation around many of the settings.

https://www.typescriptlang.org/tsconfig

https://www.typescriptlang.org/docs/handbook/compiler-options.html

### Key settings with Node: module, target, lib

Some key settings to review together:

- declaration
- lib
- module
- strict
- target

The target property is especially important with node. It controls what set of
JavaScript features will be used in the emitted code.

- Node 8 needs "es2017"
- Node 10 works "es2018"
- Node 12 works with "es2019"
- Node 14 works with "es2020"

https://stackoverflow.com/questions/48378495/recommended-typescript-config-for-node-8

https://stackoverflow.com/questions/51716406/typescript-tsconfig-settings-for-node-js-10/57607634#57607634

https://stackoverflow.com/questions/59787574/typescript-tsconfig-settings-for-node-js-12/59787575#59787575

https://stackoverflow.com/questions/61305578/what-typescript-configuration-produces-output-closest-to-node-js-14-capabilities/61305579#61305579

None of this is an endorsement of using older Node versions. Please do not use
anything older than the current "long-term support" version, currently Node 12.

### Precompilation

It is possible to skip the separate compilation step and just use tsnode to run
your code; this works great for development, and if you have a long-running
process, for deployment.

However, the TypeScript compilation step can take some time and a large project,
so if you need a fast start up speed, as will be necessary in the deployment
mechanism we will see here, it is important to compile in advance.

Study the package.json to see how this works.

## HTTP Caching and headers

See the example code for caching and not-caching.

In the old days, we would desperate add lots more headers to try to get as
many of the browsers as possible not cache:

```
Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate
Pragma: no-cache
Expires: 0
Surrogate-Control: no-store
```

This isn't necessary any more, browsers generally follow specs now.

## Demonstrating functionality of an API

We have included a bash script to show the API in action.

## Deployment to a "functions" service

We’ll deploy this example using Google Cloud Functions; it is similar to AWS
Lambda, Azure Functions, and other similar offerings.

The key to understand this deployment: we aren't shipping a server, we are
shipping just a function, just a handler that will run inside the overall server
code provided by a platform.

Look at the "server" source code versus “function” source code to see the
difference.
