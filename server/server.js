var cheerio = Meteor.require('cheerio');

Meteor.publish('packages', function(name_query) {
  // return Pypis.find({}, {sort: {api_name: 1}, limit: 20});
  var re = new RegExp(name_query, "i");
  return Pypis.find({$or: [{api_name: re}, {description: re}]},
                    {sort: {'info.downloads.last_month': -1}, limit: 20});
});

Meteor.startup(function () {
  // Regenerating package list if database is empty;
  // gets names and short descriptions of all packages in PyPI.
  // It can take a few minutes to process them.
  if (Pypis.find().count() === 0) {
    var address = "https://pypi.python.org/pypi?%3Aaction=index";
    var $ = cheerio.load(Meteor.http.get(address).content);
    var packages = [];
    var descriptions = [];
    var packagesDict = {};
    $('table.list a').each(function(i, elem) {
      packages[i] = $(this).attr('href');
      descriptions[i] = $(this).parent().next().text();
    });
    packages = packages.map(function (x) {
      var split = x.split("/");
      return split[split.length - 2];
    });
    for (var i = 0; i < packages.length; i++) {
      if (!(packages[i] in packagesDict)) {
        Pypis.insert({api_name: packages[i],
                      description: descriptions[i]});
        packagesDict[packages[i]] = true;
      }
    }
  }
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
  // below, only for testing and learning purposes
  testAutoparsing: function (path) {
  var address = path || "https://pypi.python.org/pypi";
  var data = Meteor.http.get(address).content;
  var $ = cheerio.load(data);
  var packages = [];
  $('table.list a').each(function(i, elem) {
    packages[i] = $(this).attr('href');
  });
  packages = packages.map(function (x) {
    var split = x.split("/");
    return split[split.length - 2];
  });
  return packages;
  }
});