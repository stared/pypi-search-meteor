// function httpGetJSON(theUrl)
// {
//   var xmlHttp = null;

//   xmlHttp = new XMLHttpRequest();
// HTML Requesta nie łapie...
//   xmlHttp.open("GET", theUrl, false);
//   xmlHttp.send(null);
//   return JSON.parse(xmlHttp.responseText);
// }

if (Pypis.find().count() === 0) {
  var site = "http://api.stackexchange.com/2.1/comments?order=desc&sort=creation&site=stackoverflow";
  var site2 = "https://pypi.python.org/pypi/requests/json";
  var z = Meteor.http.get(site2).data;
  Pypis.insert(z);
};
  // var res = httpGetJSON("https://pypi.python.org/pypi/requests/json");
//   Pypis.insert(res);

