/**
 * Files.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {

    name : 'string',
    url: 'string',
    filepath: 'string',
    projects: {
      model: 'projects'
    },
    user: {
      model: 'user'
    },
    projectcover: {
      type: 'boolean',
      defaultsTo: false
    },
	}

};
