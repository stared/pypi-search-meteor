Meteor.subscribe('packages');

Template.packageList.helpers({
  packages: function() {
    // return [{api_name: "aasd", description: "desc desc"}];
    var re = new RegExp("req", "i");
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
    }
  }
});