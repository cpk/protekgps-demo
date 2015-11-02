/**
 * Created by Khoa on 14/10/2015.
 */
module.exports = {
  hello: function(req, res){
    var data = req.body;
    return res.json({message: "Hello " + data.name});
  },
  bye: function(req, res){
    var name = req.param('name');
    return res.view({name: name});
  }
}
