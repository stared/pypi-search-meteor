// Meteor.subscribe('packages');

Session.set('name_query', 'qut');

Deps.autorun(function () {
  Meteor.subscribe("packages", Session.get('name_query'));
});

Template.packageList.helpers({
  packages: function() {
    var re = new RegExp(Session.get('name_query'), "i");
    return Pypis.find({api_name: re}, {sort: {api_name: 1}, limit: 10});
  }
});


Template.packageItem.helpers({
  url: function() {
    return "https://pypi.python.org/pypi/" + this.api_name;
    // + "/" + x.api_version;
  },
  more: function() {
    if (this.hasOwnProperty('info')) {
      return this.info.downloads.last_month;
    } else {
      console.log('calling meteor!');
      Meteor.call('updatePackageEntry',
                  this.api_name,
                  this._id,
                  function (error, data) {
        return "Done!";
      });
      return "Loading...";
    }
  }
});