/**
 * UserController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  index: function(req, res){

    res.view({
      layout: 'external-layout'
    });
  },
  out: function(req, res){
    res.view({
      layout: 'external-layout'
    });
  },
  reset: function(req, res){
    res.view({
      layout: 'external-layout'
    });
  },
  success: function(req, res){
    res.view({
      layout: 'external-layout'
    });
  }


}
