// Template.packages.greeting = function() {
//   return "Welcome to pypisearch.";
// };

Template.packageList.helpers({
  packages: function() {
    // return [{api_name: "aasd", description: "desc desc"}];
    return Pypis.find({}, {sort: {api_name: -1}, limit: 10});
  }
});


// Template.packageItem.helpers({
//   domain: function() {
//     var a = document.createElement('a');
//     a.href = this.url;
//     return a.hostname;
//   }
// });