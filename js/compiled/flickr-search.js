'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var FlickrSearch = (function () {
  function FlickrSearch(keyword) {
    _classCallCheck(this, FlickrSearch);

    this.keyword = keyword;
    this.url = this.requestURL();
    this.results();
  }

  _createClass(FlickrSearch, [{
    key: 'results',
    value: function results() {
      var _this = this;

      $.getJSON(this.url, function (data) {
        data.photos.photo.forEach(function (p) {
          _this.show(_this.photoURL(p));
        });
      });
    }
  }, {
    key: 'show',
    value: function show(imgSource) {
      $('#feed').append('<img src="' + imgSource + '"></img>');
    }
  }, {
    key: 'requestURL',
    value: function requestURL() {
      return 'https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=' + this.keyword + '&jsoncallback=?';
    }
  }, {
    key: 'photoURL',
    value: function photoURL(photo) {
      return 'http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
    }
  }], [{
    key: 'listener',
    value: function listener() {
      var buttonSelector = arguments.length <= 0 || arguments[0] === undefined ? '#search' : arguments[0];
      var keywordSelector = arguments.length <= 1 || arguments[1] === undefined ? '#keyword' : arguments[1];
      var feedSelector = arguments.length <= 2 || arguments[2] === undefined ? '#feed' : arguments[2];

      var button = $(buttonSelector);

      button.click(function () {
        $(feedSelector).empty();

        new FlickrSearch($(keywordSelector).val());
      });

      $(document).keypress(function (e) {
        if (e.which == 13) button.click();
      });
    }
  }]);

  return FlickrSearch;
})();