# server-in-worker
Experiments on running HTTP server in Node worker thread

To run:
node --experimental-worker http-server-main-thread.js

then navigate to http://localhost:8080/
Refreshing the browser updates the counter to confirm there's no caching or other funny business.

Node should be "modern" (i.e. I am building from the source).
