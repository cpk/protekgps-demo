/**
 * Created by Khoa on 14/10/2015.
 */
var url = "http://localhost:1337/";
var request = require('supertest')(url);

describe('SayController', function() {

  describe('#hello()', function() {
    it('should redirect to say/hello', function (done) {
      var req = request.post('say/hello');
      req.send({name: 'test'})
      req.end(function(err, res){
        if(err){
          throw err;
        }
        console.log(res.text);
        done();
      })
    });
  });

});
