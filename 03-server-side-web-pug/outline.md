# Case study 3: A server-side web application

This was the dominant way to develop web applications for the first many years
of the web - and it is still important and popular in some industries. Numerous
challenges with the SPA model don't exist with server-rendered web apps.

In the past examples, we saw how to respond to HTTP, and how to talk to a
database and get data. Now let’s put those things together with some HTML
templating, to serve a page which has data filled in from a database.

There is no API server here, no front and framework, and no JavaScript on the
front end.

In the example we will use Pug, one of the most popular server-side templating
choices. There are many others, but it doesn't matter which one we use just to
explain the architecture and get people started.

Many applications still serve their front door/login page with this server-side
rendering approach, even if behind the login they have an extensive rich client
SPA and API server.

## Server-generated HTML

We used to call this idea dynamic HTML, which is to say, HTML generated at
runtime. More recently dynamic HTML has more often referred to HTML manipulated
at runtime by JavaScript on the page; it is more clear to say server generated
HTML.

Generated means that the HTML structure and content are based on run time data.
It might be based on the user, information about the user, roles, permissions,
data from outside systems, look up reference data inside the system, or any
other source.

## Pug (formerly Jade)

PHP. JSP. ASP. A thousand other templating solutions.

Who in the room has use which of these?

For this example we have chosen Pug, formally known as Jade. It has an
indentation-based syntax, and is typically far more concise than HTML-like
template languages. Many aspects of HTML, like properly balancing tags, are
simply solved by the structure of pug, rather than being problems for users of
Pug to solve.

## Serving web app assets

In addition to dynamic content, almost every web app also contains lots of
static files. Express can easily solve these files (see the example), but beware
there are numerous complexities that can come up in complex systems.

Moreover, during production deployment it is often better to delegate serving of
static assets to infrastructure outside of your application. We will see that in
action in the deployment example here.

## Basic interactivity without client-side JS

Developers who have worked entirely in the "single page app" era will probably
assume the first screen of our example here uses React, Angular, or similar.
But it doesn't; instead just a bit of CSS is used.

## Deployment to a cloud Node host

There are various cloud hosting options for Node servers. The simpler tier of
them doesn't require knowing anything about containers or other technology, just
following a few simple rules.

For this example, we use Google App Engine (standard), which support Node 12 (as
of summer 2020). Documentation for the Goolle Cloud Platform is here:

https://cloud.google.com/appengine/docs/standard/nodejs

Anyone who wants to is welcome to set up their own Google cloud account and do
their own deployment; but in class we will simply walk through on an instructor
computer. Our deployment examples are primarily to motivate discussion and
presentation, we will generally workshop with local code only.

To use GCP, you need the Google Cloud SDK.

https://cloud.google.com/sdk/docs

CGP console is here:

https://console.cloud.google.com/

You'll need a project (create one if needed), and it has to be connected to a
billing account, even though what we are doing here will cost pennies at most.
