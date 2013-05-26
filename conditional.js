if (Meteor.isClient) {

  Template.masthead.helpers({
    diseaseIs: function(disease) {
      return Session.equals('disease', disease);
    }
  });

  Template.masthead.events({
    'click a': function(e) {
      e.preventDefault();
      Session.set('disease', e.target.href.split('#')[1]);
    },
    'click h3': function(e) {
      e.preventDefault();
      Session.set('disease', null);
    }
  });

  Handlebars.registerHelper('disease', function(disease) {
    return Session.get('disease');
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
