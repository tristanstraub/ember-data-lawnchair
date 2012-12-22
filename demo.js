var App = Ember.Application.create({
    Router: Ember.Router.extend({
	root: Ember.Route.extend({
	    index: Ember.Route.extend({
		route: '/',
		connectOutlets: function(router) {
		    router.get('applicationController').connectOutlet('content', 'main', App.store.find(App.Item));
		},

		addItem: function(router, event) {
		    App.store.createRecord(App.Item, { name: '(unnamed)' });
		    App.store.commit();
		},

		saveItem: function(router, event) {
		    App.store.commit();
		},

		deleteItem: function(router, event) {
		    var item = event.context;
		    App.store.deleteRecord(item);
		    App.store.commit();
		}		
	    })
	})
    })
});

App.Item = DS.Model.extend({
    name: DS.attr('string')
});

App.store = DS.Store.create({
    revision: 10,
    adapter: DS.LawnchairAdapter.create()
});

App.ApplicationController = Ember.Controller.extend();
App.ApplicationView = Ember.View.extend({
    templateName: 'application'
});

App.MainController = Ember.Controller.extend();
App.MainView = Ember.View.extend({
    templateName: 'main'
});


