if (Meteor.isClient) {
  Template.masthead.helpers({
    diseaseIs: function(disease) {
      return Session.equals('disease', disease);
    }
  });

  Template.masthead.events({
    'click li > a': function(e) {
      e.preventDefault();
      var disease = e.target.href.split('#')[1];
      Meteor.users.update(Meteor.userId(), {$set: {'profile.disease': disease}});
      Session.set('disease', disease);
    },
    'click div > a': function(e) {
      e.preventDefault();
      Meteor.users.update(Meteor.userId(), {$unset: {'profile.disease': true}});
      Session.set('disease', null);
    }
  });
  https://dl.dropboxusercontent.com/u/1120779/NHSHackDay/measles.pdf

  Handlebars.registerHelper('disease', function(disease) {
    return Session.get('disease');
  });

  Meteor.startup(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      Meteor.users.update(Meteor.userId(), {$set: {'profile.coords': position.coords}});
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    var result = Meteor.http.get('http://search.twitter.com/search.json', {params: {q: 'measles', geocode: '51.5171,0.1062,1mi'}});
    console.log(result);
  });
}
