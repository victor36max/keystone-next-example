// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Next app
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

// Require keystone
const keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
keystone.init({
	'name': 'Keystone Next Example',
	'brand': 'Keystone Next Example',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Start Next app
app.prepare()
	.then(() => {

		// Load your project's Routes
		keystone.set('routes', require('./routes')(app));

		// Configure the navigation bar in Keystone's Admin UI
		keystone.set('nav', {
			posts: ['posts', 'post-categories'],
			users: 'users',
		});

		keystone.start();
	});
