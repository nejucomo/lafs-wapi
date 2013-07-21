tahoewapi.js
============

This is a client library for the LAFS_ "wapi" (aka the `LAFS webapi`_)
interface written in JavaScript.

.. _LAFS: https://tahoe-lafs.org
.. _`LAFS webapi`: https://tahoe-lafs.org/trac/tahoe-lafs/browser/trunk/docs/frontends/webapi.rst

Related Projects
----------------

This repository is the new home for `tahoewapi.js`; the `previous home`_
is deprecated.

.. _`previous home`: https://bitbucket.org/nejucomo/tahoewapi.js

There are some alternative JavaScript libraries for Tahoe-LAFS; see the
`Related Projects page`_.

.. _`Related Projects page`: https://tahoe-lafs.org/trac/tahoe-lafs/wiki/RelatedProjects

Roadmap
-------

Here's the planned roadmap:

v0.1
~~~~

* is written in `strict JavaScript`_; the source includes `"use strict";` as the first expression.

* unittests which:

  - run on the commandline in node_.
  - run in browsers.

* `LAFS CAP`_ abstraction which:

  - Verifies the `CAP` format.

* `file` and `directory` abstractions which:

  - can read and write file contents as JS strings with an asynchronous API.
  - can read and write directory contents as a `JSON` compliant structure with an asynchronous API.
  - abstract XHRRequest as a dependency injection (for unittesting or alternative transports)
  - take an optional `wapi` base URL which defaults to a source detected from the current page URL.

.. _`strict JavaScript`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
.. _node: http://nodejs.org
.. _`LAFS CAP`: https://tahoe-lafs.org/trac/tahoe-lafs/browser/trunk/docs/architecture.rst#capabilities

v-The-Glorious-Future
~~~~~~~~~~~~~~~~~~~~~

These are feature goals whose design and implementation is not yet clear,
yet we anticipate incorporating them at some point in the future.

* works in whatever JavaScript sandboxing system becomes standard for LAFS
