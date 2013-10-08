======================================
A Guide to LAFS-based Web Applications
======================================

.. contents:: Contents


Introduction
============

`Tahoe-LAFS`_ provides an intriguing opportunity for novel web
applications, aka *Grid Apps*.  A primary value proposition of Grid Apps
is the ability to provide a web application using browser features which
has decentralized, private user data.

This guide is an attempt to propose clarifying terminology and provide
a comprehensive overview of design considerations for such applications.

.. _`Tahoe-LAFS`: https://tahoe-lafs.org

Using browser JavaScript with LAFS is unlike traditional web sites:

* The same content can be accessed through an arbitrary number of gateways.
* The domain is specific to a gateway.
* A common usage is a ``localhost`` gateway.

Application Origin
==================

A JavaScript application which uses LAFS may be loaded from several alternative sources:

* On a traditional web domain.  eg: ``https://someapp.example.com``
* By the gateway as a static file.  eg: ``https://127.0.0.1:3450/static/someapp.html``
* By the gateway as LAFS content.  eg: ``https://127.0.0.1:3450/uri/URI%3ADIR2%3A<...etc...>/someapp.html``
* As a browser extension.

Also note that gateways may be available via privately routable IP
addresses (the common case being ``http://localhost:3450/``) or they
may also be publicly routable (eg ``https://pubgrid.example.com``).

Data Origin
===========

Orthogonal to the JavaScript application deployment, the ``webapi``, and
thus interaction with LAFS content, may be same-origin or cross-origin
to the application (See `Same Origin Policy`_)

.. _`Same Origin Policy`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Same_origin_policy_for_JavaScript

Data Binding
============

Because LAFS capabilities are unguessable and high entropy by design,
there is no "well known" URL for JavaScript application data.  Contrast
this with the traditional web where a JavaScript application is written
with the assumption that ``https://api.example.com/rest/v3`` provides
a cross-origin web api.

There are (at least) a few alternatives for connecting an application
to relevant data:

Side-by-Side Binding
--------------------

The application code and data are stored together in LAFS.  The premier
example is the tiddlywiki hack. The application expects to find the
data relative to its ``document.location``.  In the case of tiddlywiki,
the data is identical to the application URL and Cap.

Another strategy for Side-by-Side binding is to require the user to load
the application with a relative directory URL, such as:

``https://localhost:3450/uri/${APP_DIR_CAP}/app.html``

The application then accesses data by relative URLs underneath the same
Cap, eg:

``https://localhost:3450/uri/${APP_DIR_CAP}/data.json``

**FIXME:** Point people to the appropriate tiddlywiki fork and public
live examples.  Also, verify that a tiddlywiki is a single file which
overwrites itself.  Does this work if it is loaded as ``/uri/${FILE_CAP}``
?

Seed Binding
------------

The application code begins life with no user-specific data, but generates
it ex-nihilo.  It may generate a Side-by-Side "child" application,
or it may require Explicit Binding (see next). For example:

#. The user goes to: ``http://localhost:3450/${SEED_CAP}/app.html``
#. The application creates a new directory as ``${DATA_CAP}``
#. The application handles ``${DATA_CAP}`` in various manners such as:

  * Not attempting to preserve ``${DATA_CAP}`` and treating it as
    temporary storage.
  * Redirecting the browser to a new URL involving ``${DATA_CAP}``.
  * Using some other explicit binding strategy (see next).

Explicit Binding
----------------

The application code accepts a data Cap as some kind of parameter,
such as:

* Requiring the data Cap in the URL query or fragment.
* Providing a user input widget where the user pastes the Cap.
* Storing the Cap in browser local storage.
* Storing the Cap by making a cross-origin request to a different web service.
* Are there other strategies?


Deployment
==========

There are at least four possible deployment strategies for Grid Apps:

Grid Deployment
---------------

The application code is stored in the grid.  In order to load the
application, the user must know its Cap.

This deployment strategy works with any of the data binding strategies.

Tiddlywiki is an example of this deployment strategy with Side-by-Side
data binding.

``/static`` Deployment
----------------------

The application code is local to a gateway, while the data is stored in
the LAFS grid.  LAFS comes with a performance visualization tool which
is an example of this.

**FIXME:** What's the name of this visualization tool?  Provide
instructions for viewing it and/or a live public URL.

A user must explicitly install the application to their gateway (unless
it comes with the standard gateway, such as the case for the performance
visualizer).

Note that this deployment strategy allows Seed Binding or Explicit
Binding, but not Side-by-Side binding.

This is somewhat similar to using a non-browser LAFS-aware application,
such as a desktop application which makes requests to a gateway for
storage.

Cross-Domain Deployment
-----------------------

The application is deployed at a public URL and makes cross-origin
requests to the gateway.

**Example:** A browser-based code editor lives at
``https://editor.example.com`` and supports a variety of user storage
mechanisms.  One is support for LAFS storage which can be configured to
use a public gateway at ``https://pubgrid.example.com``.

**Note:** It might be appealing to have an application at a public
URL which makes cross-origin requests to a ``localhost`` gateway.
Unfortunately as this is a common attack vector, browsers may prevent
this architecture as a special case of cross-origin requests.  :-(

Like ``/static`` Deployment, this precludes Side-by-Side binding.

This is effectively an augmented "standard" web application, which may
be appealing because users need not necessarily understand the difference
and may benefit from LAFS without even knowing it exists.

Browser Extension Deployment
----------------------------

The application is a browser extension and can make cross-origin and
localhost requests to a gateway.

This is similar to ``/static`` and Cross-Domain deployments in terms of
data binding, and similar to ``/static`` deployment in its similarity
to a non-Web "desktop" LAFS application.

Further Work
============

This document, or similar documents should explore the usability and
security aspects of Grid Apps.


Feedback
========

If you have specific suggestions for this document, file Github issues.
If you want to have a general or exploratory discussion, post to the
`tahoe-dev` list.
