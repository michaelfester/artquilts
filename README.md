![Cézanne quilt](https://github.com/michaelfester/artquilts/raw/master/doc/images/quilt.png)

Quilts
======

Create [quilts](http://imagequilts.com/) of your favorite artists.

Here are mine: [michaelfester.com/quilts](http://michaelfester.com/quilts).

## Requirements

```bash
$ brew install node
$ npm install -g grunt-cli
$ npm install -g bower
$ sudo gem install compass
$ npm install
$ bower install
```

## The setup

All artworks must be in a directory named `data/` placed in the project root. It is expected to be of the form:

```
data/
  cezanne/
    1860 - Landscape with Mill - 23x31cm - Oil on canvas.jpg
    ...
  degas/
    ...
```

Each artist is defined by an id (cf. `Gruntfile.js` for an example setup). The folder
names should correspond to these ids.

To extract proper metadata for each artwork, the image files are expected to follow the naming convention

```
YEAR - TITLE - WIDTHxHEIGHTcm - MATERIAL.jpg
```

## Generating the quilts

For each artist, generate the thumbnails by running (replace `$(ARTIST_ID)` with the id of the artist in question):

```bash
$ grunt image_resize:artist --artistId=$(ARTIST_ID)
$ grunt copy:data --artistId=$(ARTIST_ID)
```

Generate index page and quilt pages for each artist defined in `Gruntfile.js`

```bash
$ grunt && grunt watch
$ open build/index.html
```

To add a Google Analytics tracking code, run `grunt` with the option `--gaTrackingCode`:

```bash
$ grunt --gaTrackingCode=UA-XXXXX-X
```

## Example gallery

An example gallery, using artworks from [WikiPaintings](http://www.wikipaintings.org/) can be found here: [michaelfester.com/quilts](http://michaelfester.com/quilts).