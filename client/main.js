// Meteor.subscribe('packages');

Session.set('name_query', 'qut');

Deps.autorun(function () {
  Meteor.subscribe("packages", Session.get('name_query'));
});

// jquery variant does not help
// Template.searchBar.rendered = function() { 
//   $('.searchInput').on('keypress', function () { 
//     var text = this.value;
//     if (text.length > 2) {
//       console.log(text);
//       Session.set('name_query', text);
//     } else {
//       console.log("Write more letters! We have only: " + text);
//     }
//   }); 
// } 

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