# Case study 6: GraphQL in a post-REST server implementation

This is our least elaborate and complex example, mostly wrapping an existing
(and popular) library/tool to provide a GraphQL interface to a data (in this
case, data in a PostgeSQL RDMBS).

## Introduction to GraphQL

GraphQL, which we've mentioned several times along the way, is not so much about
graphs per se, but rather about providing a higher abstraction for data access
APIs.

https://graphql.org/

## Schema as a shared vocabulary

When parts of a system communicate via GraphQL, the GraphQL schema serves as a
shared vocabulary for the shape for the available data and for how to query that
data.

A key principle of GraphQL: the shape of the question determines the shape of
the answer.

## Abstracting away the endpoint details

While it is possible to implement a GraphQL endpoint "from whole cloth", this is
a great amount of work. Most systems use some pre-existing infrastructure to
build on, which does much of the work in implementing the endpoints.

## Resolvers rather than endpoint implementations

If you have an existing system built as a set of separate endpoints, typically
the endpoint implementations dissolve away, and the pieces of code that were in
that were there instead end up in GraphQL “resolvers”.

## Example: Postgraphile

https://www.graphile.org/postgraphile/

Resourse:

"GraphQL: What and Why - Andrew Weins - Advanced Angular Lunch":

https://www.youtube.com/watch?v=uhY81zcT8ns
