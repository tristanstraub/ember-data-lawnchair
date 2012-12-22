ember-data-lawnchair is an adapter for ember-data for lawnchair.

The following demonstrates its usage:

```javascript
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
```


```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    
    <script type="text/x-handlebars" data-template-name="application">
      {{outlet content}}
    </script>

    <script type="text/x-handlebars" data-template-name="main">
      <a href="#" {{action addItem }}>Add Item</a>
      <ul>
	{{#each content}}
	<li>{{view Ember.TextField valueBinding="name"}}
	{{#if isDirty}}
	<a href="#" {{action saveItem this}}>Save</a>
	{{/if}}
	<a href="#" {{action deleteItem this}}>Delete</a>
	</li>
	{{/each}}
      </ul>
    </script>

    <script type="text/javascript" src="lib/vendor/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="lib/vendor/handlebars-1.0.rc.1.js"></script>
    <script type="text/javascript" src="lib/vendor/ember.js"></script>
    <script type="text/javascript" src="lib/vendor/ember-data.js"></script>
    <script type="text/javascript" src="lib/vendor/lawnchair.js"></script>
    <script type="text/javascript" src="lib/vendor/lawnchair-adapter-indexed-db-0.6.1.js"></script>
    <script type="text/javascript" src="lib/vendor/uuid.js"></script>
    <script type="text/javascript" src="lib/ember-data-lawnchair.js"></script>
    <script type="text/javascript" src="demo.js"></script>
  </head>
  <body>

  </body>
</html>
```
