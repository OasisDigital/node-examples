# Case study 5: Isomorphic code and data push

In this example, we step away from just a single executable, and instead look at
a monorepo comprising both server and client-side code. There is a library
containing a small amount of TypeScript shared between the client and server
side, providing context to discuss such arrangements.

Additionally, the simple application here (a feature anemic chat system)
demonstrates one way to "push" data immediately to connected browser client
pages.

## Streaming data

Most computer software deals with change, not just static data. If that change
happens slowly, it is suitable to display new data only when the user takes
action. But if the data is changing more quickly, it is often better to
immediately dispatch this updated data from a server/distributed system, for
immediate display on a user’s device.

### Websockets

The websocket protocol is an alternative to HTTP. It allows streaming,
bidirectional data transfer between a browser and server. Because it is not
HTTP, usually requires additional support both in server infrastructure and in
any intermediary systems (proxies etc.), support which was initially quite
lacking but is now generally widely available.

The Nest server infrastructure we looked at in the previous example includes
support for websockets.

Importantly, this is a low-level protocol; it specifies nothing about the
contents or semantics of data flowing back and forth.

### SSE

SSE (server sent events) is an alternative to websockets, structured as an
extension rather than replacement for HTTP. It provides only one direction of
data transfer (from the server to a browser), with the assumption that
"upstream" novelty would be communicated via other already existing means.

Because it is an extension of HTTP, it requires much less specific support from
other layers or intermediary systems. The SSE specification also includes
automatic reconnection. SSE is generally very suitable for most data push use
cases. Only a minority of cases benefit from the additional complexity
and capability of websites.

The example application here uses SSE; a small adapter library makes it workable
within.

### Message Queue Telemetry Transport (MQTT)

MQTT is an IOT protocol, designed for scale. It is intentionally lightweight, so
that it can be implemented on very small devices, yet is also suitable for
browser use via an extension to the protocol which connects wraps it in the web
socket mechanism.

MQTT provides more structure than the higher-level protocols mentioned above,
with the ideas of topics, channels and other common message oriented middleware
ideas.

MQTT is probably better to build on if your application can be described
effectively with an idea of channels, topics, subscriptions, etc.

https://mqtt.org/

https://www.npmjs.com/package/mqtt

https://github.com/mqttjs/MQTT.js

### Hosting considerations and MOM

Many developers (including Oasis Digital instructors) are routinely tempted to
implement complement complex capabilities on top of low level protocols
directly. Yet this is typically unwise.

Consider something like hosting a system which will scale to many servers, which
has which uses any of the above mechanisms for communicating data directly to
connected browsers / clients. In any such case, there will necessarily need to
be a way of unifying the server-side state, so that there is no "split brain"
among multiple server instances.

These problems are already solved by off-the-shelf “message more oriented
middleware” systems, servers, or "brokers". Here are a couple of them, there are
many more.

https://www.rabbitmq.com/plugins.html#rabbitmq-stomp

https://activemq.apache.org/

## Data push example

We will review our example code together. It shows a monorepo, TypeScript code
shared across layers of the system, and data pushed to all connected clients.

## Isomorphic code

Isomorphic ("same shape") code means code which can be used across multiple
tiers of the system which differ in important ways. One of the big motivations
for choosing Node as a server-side platform (and something like TypeScript of
the language) is to make it possible to use not just the same language, but in
some cases the exact same code, across layers.

## Monorepos

While not Node-specific, many teams adopt Node as a way to unify the language
between client and server tiers, leading to a natural occasion to also move to a
monorepo. We'll discuss benefits and tradeoffs of monorepos, then look at an
example of one in use.

### Lerna

Lerna is a widely used tool to manage Node / npm monorepos.

https://lerna.js.org/

### Nx

Nx is a newer, competing monorepo tool with more specific support for Node code,
Nest code, React code, Angular code, and more.

https://nx.dev/react

## Deployment in a Docker container to a cloud hosting service

Container-based deployment is in no way specific to node, yet it is popularly
adopted with node. We will discuss the basics here, and hopefully be of service
to teams using this technology.

### Docker introduction

Docker is the most popular tool for creating and managing containers, but by no
means the only way to do it. We use it here is the example because it is the
most popular.

### Container hosting

This is one of the most popular ways to host Node server code. We build the
code, package the built results in a container, and then use a container hosting
service to get it up and running “in the cloud”.

In the example here, we are using Google cloud platform, and its simplest way to
host the container, the ability to host the container in a virtual machine in
"compute engine".

We will look at the specifics here as an example, mostly to provide an occasion
for discussing how this fits with Node concepts. We will minimize the time spent
on Google Cloud Platform specific aspects, as we expect our Node training
customers to be widely distributed across all the major cloud platforms.

### Kubernetes

Like Docker, Kubernetes is neutral as to what platform and language are used to
build code deployed with it. Nonetheless, companies adopting Node are often in
the process of rolling out an infrastructure that includes that potentially
includes Kubernetes. We will discuss it briefly, and go into more depth
depending on interest level of the group.
