Meteor.subscribe('packages');

Template.packageList.helpers({
  packages: function() {
    // return [{api_name: "aasd", description: "desc desc"}];
    return Pypis.find({}, {sort: {api_name: -1}, limit: 20});
  }
});


Template.packageItem.helpers({
  url: function(x) {
    return "https://pypi.python.org/pypi/" + x.api_name; 
    // + "/" + x.api_version;
  }
});