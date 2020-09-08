# Case study 4: Complex REST API server with authorization and authentication

Here we will show/construct a more complex and realistic REST API server. Unlike
the earlier server, this time we will use Nest JS, a library rapidly growing in
popularity for building API servers with Node.

## REST in more depth

What is REST? It is a set of principles for an architecture of how client and
server systems interact, inspired by how disparate systems, not necessarily
designed in a coordinated way, interact on the web.

https://en.wikipedia.org/wiki/Representational_state_transfer

### History and context

"The term representational state transfer was introduced and defined in 2000 by
Roy Fielding in his doctoral dissertation." (Wikipedia) He did not describe it
as a future architecture that should be built; rather he was primarily
describing, formalizing, and expanding the architecture of the web that had
emerged from practice already at that point.

### Advantages

Generally it makes sense to choose REST proportionally with how closely your
problem domain resembles the worldwide decoupled problem domain in which REST
evolved and was formalized to handle well. In other contexts, for example if you
care only about one specific aspect of REST, it is reasonable to adopt something
different but which also has that one key attribute, such as cachability.

Building a widely distributed system, with many different pieces created by
different organizations? Different parts evolve at different rates? Many
different media types are passed around? These are all hints toward rest.

The payoff from rest generally corresponds to the extent to which a system fully
embraces it.

Another advantage of REST is that it has become a default of sorts. Very
rarely will any system designer be criticized for choosing REST; in some
contexts this is a vital characteristic.

### Disadvantages

The most frequent disadvantage of REST as it is often used in contexts where few
of its advantages deliver value. When that happens, the disadvantage is
primarily that a system does not obtain advantages that could be obtained from
other approaches.

### REST-ish vs REST

Many systems which talk about REST, are really more like REST-ish. Adopting bits
and pieces of REST ideas, but not implementing anything close to the full
vocabulary.

## Nest

Nest JS has emerged over the last couple of years as a popular way to create API
servers with Node. Nest intentionally has some resemblance to Angular, but it is
not Angular-specific and is widely used in projects and organizations with no
Angular.

https://nestjs.com/

### Comparisons with Nest

- Loopback (Node)
- Spring
- many others

https://stackoverflow.com/questions/60948693/nestjs-vs-loopback-4

https://medium.com/swlh/using-three-of-the-top-nodejs-web-rest-api-frameworks-d1d6dac021ee

## Routing

Routing refers to the mapping between URLs and pieces of functionality. The URL
space is typically managed hierarchically, and this is true with Nest as well as
other frameworks.

In the example, we see several variants of routing.

## Authentication

### Passport

Passport is a very popular library for Node that handles authentication. It is
pluggable, and there are both numerous plug-ins from the Passport team as well
as many from the ecosystem.

The example program uses Passport with wiring via Nest.

### Outsourcing authentication

Many enterprise applications and APIs should consider outsourcing / delegating
authentication to another system. Here we can discuss some of the options and
mechanisms. Of course, Passport includes (directly or via plugins) support for
such delegation.

## Authorization

### Declarative authorization using a decorator

(Shown in the example.)

## Caching data

Data caching, and especially cache invalidation, is an enormous and vital topic
in computer science. We cannot do full justice to in this node training. But we
can take a survey of the caching technologies most often associated with Node
development, and this should be helpful for teams stepping into a complex
enterprise architecture which probably already has caching strategies in place.

### In-process caching

It is tempting to just your own code for an in-process cache, but this is more
error-prone than it first appears, especially if you want options around cache
expiry. Instead, consider the node-cache package:

https://www.npmjs.com/package/node-cache

As with many Node packages you will import it somewhat differently with
TypeScript than what is shown in the JavaScript centric documentation.

```
import * as NodeCache from 'node-cache';
```

### Memcached

This popular out of process (but memory centric) key-value cache can be used
with Node easily. While not Node specific it is quite popular.

We mention it here to as yet another example of the following:

With the old, naïve approach to Node coding, dealing with each bit of
asynchronicity via manual call back, something like using an out of process cache
is an inherently inconvenient thing to do.

But with modern style, in which you rely heavily on a async-await to make most
asynchronicity someone else's problem, that challenge melts away entirely.

### Redis

More complex applications sometimes use Redis as a cache; Redis is also used in
the fuzzy boundary between caching and primary data stores.

## Generating complex data types

### PDF

### Images

### Excel files

## API testing

### Manual API testing

Initially it can seem appealing to set up a GUI for manually manipulating your
API; then click through your manual examples to test it. Postman is popular for
this, although Postman's marketing actually targets quite different use case.

https://www.postman.com/

"Collaboration Platform for API Development"

We do not recommend manual API testing. Certainly any kind of tool to ease
experimenting with APIs can be convenient... but it will never be convenient to
manually recheck all of your API endpoints and use cases after each change.

### Automated testing (Supertest)

Supertest is a bit of tooling to ease use of the testing tools we have already
seen, with HTTPs API; we've used it several times in the examples.
Alternatively, it should already be quite easy to call your API; you need the
machinery to do this and all of your client applications. That same machinery
can readily be used in an automated test.

How complete should an API test be? ∑Complete enough that, ideally, very few additional bugs are discovered when a real client application uses the API instead of the test suite.

## Deployment/operations with PM2

Until "cloud" became the dominant paradigm, typically server applications were
deployed to (physical or virtual) servers with a mechanism to start running the
code on OS start, restart after reboot or failure, etc. Of course it is possible
to hand-code scripts to achieve this, but since it is still a common scenario,
high quality tools are available off-the-shelf.

The most popular auto-start-restart system for Node is probably PM2:

https://pm2.keymetrics.io/

Getting started:

https://pm2.keymetrics.io/docs/usage/quick-start/

Currently PM2 is owned by KeyMetrics, which adds a commercial online service
atop the open-source core PM2.

**We generally recommend a cloud- or container-based approach instead - so no demo.**

(PM2 can also be used in conjunction with cloud hosting - see its web site for
details.)
