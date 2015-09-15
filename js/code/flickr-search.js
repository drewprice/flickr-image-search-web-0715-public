class FlickrSearch {
  constructor(keyword) {
    this.keyword = keyword;
    this.url     = this.requestURL();
    this.results();
  }

  results() {
    $.getJSON(this.url, data => {
      data.photos.photo.forEach(p => {
        this.show( this.photoURL(p) );
      })
    });
  }

  show(imgSource) {
    $('#feed').append(`<img src="${imgSource}"></img>`)
  }

  requestURL() {
    return `https://api.flickr.com/services/rest/?format=json&method=flickr.photos.search&api_key=2fd41b49fedfd589dc265350521ab539&tags=${this.keyword}&jsoncallback=?`
  }

  photoURL(photo) {
    return `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`
  }

  static listener(buttonSelector = '#search', keywordSelector = '#keyword', feedSelector = '#feed') {
    let button = $(buttonSelector);

    button.click(function() {
      $(feedSelector).empty();

      new FlickrSearch( $(keywordSelector).val() );
    });

    $(document).keypress(e => {
      if (e.which == 13) button.click();
    });
  }
}
