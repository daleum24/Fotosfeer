Fotosfeer Application
======================

Demo:
-----
[**LIVE DEMO**](http://www.fotosfeer.com/home)

Summary:
--------
Fotosfeer is a work-in-progress image uploading web application specifically for geotagged photographs.

Built with Ruby on Rails on the backend as a JSON API for Backbone.js on the front-end.  

Notes:
------
* Rails user authentication built with BCrypt
* Backbone models/collections with [Backbone-relational.js](http://backbonerelational.org/)
* Drag and drop file upload with [jQuery](https://github.com/blueimp/jQuery-File-Upload) 
* Automated extraction of image's latitude/longitude with [exifr](https://github.com/remvee/exifr)
* Interactive map displaying image location with [Mapbox](https://www.mapbox.com/)
