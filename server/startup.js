Meteor.publish('packages', function(name_query) {
  // return Pypis.find({}, {sort: {api_name: 1}, limit: 20});
  var re = new RegExp(name_query, "i");
  return Pypis.find({api_name: re}, {sort: {api_name: 1}, limit: 10});
});

// var sanitizeReleases = function ...

Meteor.methods({
  updatePackageEntry: function (name, id) {
    var jsonUrl = "https://pypi.python.org/pypi/" + name + "/json";
    var res = Meteor.http.get(jsonUrl).data;
    delete res.releases;
    // ^ as it is a tricky field with dots in keys
    // but I will need to process it one way or the other
    Pypis.update({_id: id}, {$set: res});
    return "Done!";
  }
});
