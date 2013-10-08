lafs-wapi
=========

**lafs-wapi:** A browser client library for the LAFS_ "wapi" (aka the
`LAFS webapi`_) interface written in JavaScript.

.. _LAFS: https://tahoe-lafs.org
.. _`LAFS webapi`: https://tahoe-lafs.org/trac/tahoe-lafs/browser/trunk/docs/frontends/webapi.rst

Licensing
---------

This code is licensed under the GPLv3.  It uses a third-party test
framework `jasmine` which is licensed under the MIT license.

.. FIXME - add a link for jasmine.

Dependency Management
---------------------

There are no application runtime dependencies aside from the standard
DOM `XMLHttpRequest API`_.  The test framework includes a copy of the
`jasmine` behavioral driven development framework.

.. _`XMLHttpRequest API`: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest

For applications using ``lafs-wapi``, it uses the the `Universal Module
Definition`_ to support dependency management with either `Asynchronous
Module Definition`_ or "classic" browser management (manually ordered
``<script>`` tags).

.. _`Universal Module Definition`: https://github.com/umdjs/umd
.. _`Asynchronous Module Definition`: https://github.com/amdjs/amdjs-api/wiki/AMD

Deployment
----------

See the `LAFS Grid-App Guide`_ for an overview of design considerations
when creating LAFS-enabled web applications.

.. _`LAFS Grid-App Guide`: https://github.com/nejucomo/lafs-wapi/blob/master/app-guide.rst

Related Projects
----------------

This repository is the new home for `lafs-wapi`; the `previous home`_
and name `tahoewapi.js` is deprecated.

.. _`previous home`: https://bitbucket.org/nejucomo/tahoewapi.js

There are some alternative JavaScript libraries for Tahoe-LAFS; see the
`Related Projects page`_.

.. _`Related Projects page`: https://tahoe-lafs.org/trac/tahoe-lafs/wiki/RelatedProjects

Roadmap
-------

Here's the planned roadmap:

v0.1
~~~~

* example application with step-by-step instructions.
* is written in `strict JavaScript`_; the source includes `"use strict";` as the first expression.

  .. _`strict JavaScript`: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode

* uses UMD to facilitate "traditional browser" or AMD dependency management.
* unittests which run in browsers.
* integration tests which run in browsers against a true LAFS webapi.

v-The-Glorious-Future
~~~~~~~~~~~~~~~~~~~~~

* Node support?  For now this is only a browser library, but if there
  is overlap for general JS use, this could be split or abstracted.
* works in whatever JavaScript sandboxing system becomes standard for LAFS.
