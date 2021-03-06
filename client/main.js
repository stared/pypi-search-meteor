Session.set('name_query', 'qut');

Deps.autorun(function () {
  Meteor.subscribe("packages", Session.get('name_query'));
});

Template.searchBar.events({
  'keyup .searchInput': function (event, template) {
    var text = template.find('.searchInput').value;
    if (text.length > 2) {
      console.log(text);
      Session.set('name_query', text);
    } else {
      console.log("Write more letters! We have only: " + text);
    }
  }
});

Template.packageList.helpers({
  packages: function () {
    var re = new RegExp(Session.get('name_query'), "i");
    return Pypis.find({$or: [{api_name: re}, {description: re}]},
                      {sort: {'info.downloads.last_month': -1}, limit: 20});
  }
});


Template.packageItem.helpers({
  url: function () {
    return "https://pypi.python.org/pypi/" + this.api_name;
  },
  downloads: function () {
    if (this.hasOwnProperty('info')) {
      return this.info.downloads.last_month;
    } else {
      Meteor.call('updatePackageEntry',
                  this.api_name,
                  this._id,
                  function (error, data) {
        return "Done!";
      });
      return "Loading...";
    }
  },
  tags: function () {
    var tmp, tags;
    if (this.hasOwnProperty('info')) {
      tags = this.info.classifiers || [];
    } else {
      tags = [];
    }
    // I will as something for hierarchy
    tags = tags.map(function (tag) {
      tmp = tag.split(" :: ");
      return {type: tmp[0], value: tmp.slice(1).join(": ")}
    })
    return tags;
  },
  max10chars: function (x) {
    if (x === undefined) {
      return "";
    } else if (x.length > 12) {
      return x.slice(0,9) + "...";
    } else {
      return x;
    }
  },
  homePage: function () {
    if (this.info && this.info.home_page !== "UNKNOWN") {
      return this.info.home_page;
    } else {
      return "";
    }
  }
});