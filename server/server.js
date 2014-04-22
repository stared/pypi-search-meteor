var cheerio = Meteor.require('cheerio');

Meteor.publish('packages', function(name_query) {
  // return Pypis.find({}, {sort: {api_name: 1}, limit: 20});
  var re = new RegExp(name_query, "i");
  return Pypis.find({api_name: re}, {sort: {'info.downloads.last_month': -1}, limit: 20});
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
  },
  testAutoparsing: function () {
  var data = Meteor.http.get("https://pypi.python.org/pypi").content;
  var $ = cheerio.load(data);
  // var res = $('table.list a');
  var packages = [];
  $('table.list a').each(function(i, elem) {
    packages[i] = $(this).attr('href');
  });
  return packages;
  }
});