# Bitcoin Trade Guard

[![Build Status][status]][travis]

## Important notice

This app is in an early development stage and not ready for production yet.

## Introduction

If you are trading with Bitcoin, it's important to have overview of all your
trades. That way you can analyse your trading strategy, check how much you
profit or lose and make further decisions.

This app provides numerous features which help you with your trading activity:

* Manage all your trades
* Synchronize trades from popular Bitcoin exchanges
* Analyze your activity with key figures and charts
* Check the stats at historical moments
* Keep your data local or save it to the cloud

## Build

In order to build the web app, you need to ensure that you have `git`,
`nodejs` and its package manager `npm` installed on your system.
With these requirements fulfilled, you can build from shell by
following this example:

    # Get the project
    $ git clone https://github.com/davidknezic/bitcoin-trade-guard.git
    
    # Change into project folder
    $ cd bitcoin-trade-guard/
    
    # Install grunt & bower globally, so we can use their cli commands
    $ npm install -g grunt-cli bower
    
    # Install project dependencies used for building
    $ npm install
    
    # Install project dependencies used on client side
    $ bower install
    
    # Optional: Run the tests
    $ grunt test
    
    # Build the project
    $ grunt build

The built web app is placed into the newly created `build`
folder, located in the project root. You can take these files and let
them beeing served by any web server.

## Contributing

Help is always welcome!
Contribute to the project by forking and submitting a pull request.

[status]: https://travis-ci.org/davidknezic/bitcoin-trade-guard.svg
[travis]: https://travis-ci.org/davidknezic/bitcoin-trade-guard
