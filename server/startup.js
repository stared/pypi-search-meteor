// function httpGetJSON(theUrl)
// {
//   var xmlHttp = null;

//   xmlHttp = new XMLHttpRequest();
// HTML Requesta nie łapie...
//   xmlHttp.open("GET", theUrl, false);
//   xmlHttp.send(null);
//   return JSON.parse(xmlHttp.responseText);
// }

Meteor.publish('packages', function() {
  // return Pypis.find({}, {sort: {api_name: 1}, limit: 20});
  var re = new RegExp("req", "i");
  return Pypis.find({api_name: re}, {sort: {api_name: 1}, limit: 10});
});

// if (Pypis.find().count() === 0) {
//   var site = "http://api.stackexchange.com/2.1/comments?order=desc&sort=creation&site=stackoverflow";
//   var site2 = "https://pypi.python.org/pypi/requests/json";
//   var z = Meteor.http.get(site2).data;
//   Pypis.insert(z);
// }

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

  // var res = httpGetJSON("https://pypi.python.org/pypi/requests/json");
//   Pypis.insert(res);

