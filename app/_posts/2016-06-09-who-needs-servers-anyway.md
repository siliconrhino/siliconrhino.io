---
layout: post
headBackground: yellowBg
topHeadingBg: subpage-topHeading yellow
title: Who needs servers anyway?
description: Sometimes, you simply don't need them..
tags: ["aws", "silicon rhino"]
categories : []
imageUrl: 'http://www.siliconrhino.io/img/backgrounds/serverless.b0fd.jpg'
published: true
---

Recently we've become extremely interested in the concept of building systems that don't require any web servers. Due to the nature of our customers, and them not generally having in house development teams, reducing the amount of operational work from a system has obvious advantages for a large portion of our projects. Getting rid of web servers is a way to achieve that. This leads us to a concept called serverless architecture.

First lets make it clear what that means. There are in fact servers involved under the hood, but it's simply the case that they've been largely abstracted away, and someone else has to worry about their maintenance. This means we can focus more on building the core logic of our application and less on running the infrastructure which supports it. This is really a broad term that can take many forms, but we'll take a look at some examples in a moment.

Systems following this approach normally end up being easy to scale from an operational point of view by nature, which is never a bad thing, and because they can result in cost models where you only pay for what you use it keeps the cost down for low throughput applications - perfect for fledgling ideas and [MVPs](https://en.wikipedia.org/wiki/Minimum_viable_product)

Managed application hosting services will also reduce the amount of operation required for a system, but they tend to have a larger price tag when it comes to the amount of resources you actually get for your money.

So we've established servers are bad! Not really, but it makes sense to avoid the overhead if we can. Let's take a look at some of the ways we can achieve a serverless architecture, and the types of application we can create with these methods.

###Back-ends With AWS Lambda
<div class="bottom-border yellow"></div>

Lately we're finding more and more uses for this fairly new service from AWS. The concept is a simple but extremely powerful one: being able to run arbitrary code in response to events. This allows us to do pretty much anything actually, but obvious possibilities are things like processing uploaded images, or running nightly database backups. Couple it with another service from AWS, API Gateway, and we can even create entire [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) APIs with Lambda, where the events are web requests from the browser or other services.

With Lambda, Amazon handle running your code in a highly available and highly scalable manner, while incurring no cost until the application receives any usage. Even then, AWS offer a generous free tier for Lambda and API Gateway, allowing us to create APIs with virtually no cost for small applications. Lambda is limited to a few specific programming languages, but with node and java in the list, most people should find a familiar language in there.

Examples of applications:

  - RESTful APIs
  - Event based processing
  - Scheduled tasks
  - Web hook processing

There are many other advantages to using Lambda, such as encouraged micro-service architecture, deployment versioning, logging, and monitoring, all right out of the box, but that's a post in itself.

###Front-ends With AWS S3
<div class="bottom-border yellow"></div>

With the rise of javascript applications comes less of a need for server-side execution. Where applications are solely executed in the user's browser, the task of the back end becomes largely a case of serving up files. Enter S3, a highly scalable storage system! Right out of the box, Amazon's S3 service can be configured to work like a web server in this sense, which means we can use it to host [static websites](https://en.wikipedia.org/wiki/Static_web_page) or [SPAs](https://en.wikipedia.org/wiki/Single-page_application), or anything else built entirely in client-side code. As with Lambda, Amazon handle running these applications in a highly available and scalable manner and offer a generous free tier, and applications incur no cost when there is no usage.

Examples of applications:

  - Static websites
  - API backed web apps

Using a combination of Lambda for the API, and S3 for the front end application, it's thus possible to build an entire data-backed SPA without having to manage a single server or pay a single penny. We've had great success with these concepts lately, and would highly recommend the approach.

###Data Persistence With Firebase
<div class="bottom-border yellow"></div>

We started using this platform for our Drink mobile app recently. Their primary function is as a database, but they also offer authentication and hosting services. The key here is the smart way Firebase allows us to enforce user security while accessing data directly from the client device. Without this feature, the pattern is normally to route all database access through a server, adding a layer of security in between. Not only does that add a requirement for server-sider execution, but it also means a bunch of boilerplate code to develop, and an additional place for [things to go wrong](https://en.wikipedia.org/wiki/Murphy's_law).

This approach can be combined with either S3, or Firebase's own resource hosting service, for cases where application files need to be served up to the client device.

Like Amazon, they offer a fairly generous free tier, which has allowed us to test the concept of our Drink app without any initial running costs.

Examples of applications:

  - Mobile apps
  - Web apps

---

Those are just a few of the ways to get started with a serverless aproach. It's still important to weigh up the situation before choosing tools and technologies, as every approach has it's downsides, but it's definitely worth considering a serverless architecture if you haven't already.

Be sure to follow silicon rhino for future updates and thoughts on technology and startups

<!-- [get the PDF]({{ site.url }}/assets/mydoc.pdf). -->
