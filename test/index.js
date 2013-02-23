var mongoose = require('mongoose'),
  should = require('should')
  ms = require('../');

delete mongoose.models.MstubModel;

var MstubSchema = new mongoose.Schema({
  name: String,
  email: String
});

var MstubModel = mongoose.model('MstubModel', MstubSchema);

describe('Suite', function() {
  describe('## Global mongoose-mstub functions tests', function () {
    afterEach(function (done) {
      // Unstub all after each test
      munstub(MstubModel);
      done();
    });

    it('Should mongoose-mstub functions exists', function (done) {
      should.exists(mstub);
      mstub.should.be.a('function');
      should.exists(munstub);
      munstub.should.be.a('function');
      done();
    });

    it('Should sutb method save overrided', function (done) {
      var function_name;

      function_name = MstubModel.prototype.save.prototype.constructor.name;
      function_name.should.eql('save');

      mstub(MstubModel, 'save', function save_stub (err) {
        callback(err);
      });

      function_name = MstubModel.prototype.save.prototype.constructor.name;
      function_name.should.eql('save_stub');

      done();
    });

    it('Should sutb method save overrided and method find still stub', function (done) {
      var function_name;

      // Stub save method
      mstub(MstubModel, 'save', function save_stub (err) {
        callback(err);
      });

      // Stub find method
      mstub(MstubModel, 'find', function find_stub (err) {
        callback(err);
      });

      // Assert method save is stub
      function_name = MstubModel.prototype.save.prototype.constructor.name;
      function_name.should.eql('save_stub');
      
      // Assert method find is stub
      function_name = MstubModel.find.name;
      function_name.should.eql('find_stub');

      // Unstub only method save
      munstub(MstubModel, 'save');

      // Assert method save is back
      function_name = MstubModel.prototype.save.prototype.constructor.name;
      function_name.should.eql('save');

      // Assert metdhod find is stub
      function_name = MstubModel.find.name;
      function_name.should.eql('find_stub');

      done();
    });
  })

  describe('## Module mongoose-mstub functions tests', function () {
    afterEach(function (done) {
      // Unstub all after each test
      ms.munstub(MstubModel);
      done();
    });

    it('Should mongoose-mstub module functions exists', function (done) {
      should.exists(ms.mstub);
      ms.mstub.should.be.a('function');
      should.exists(ms.munstub);
      ms.munstub.should.be.a('function');
      done();
    });

    it('Should sutb method save overrided', function (done) {
      var function_name;

      function_name = MstubModel.prototype.save.prototype.constructor.name;
      function_name.should.eql('save');

      ms.mstub(MstubModel, 'save', function save_stub (err) {
        callback(err);
      });

      function_name = MstubModel.prototype.save.prototype.constructor.name;
      function_name.should.eql('save_stub');

      done();
    });

    it('Should sutb method save overrided and method find still stub', function (done) {
      var function_name;

      // Stub save method
      ms.mstub(MstubModel, 'save', function save_stub (err) {
        callback(err);
      });

      // Stub find method
      ms.mstub(MstubModel, 'find', function find_stub (err) {
        callback(err);
      });

      // Assert method save is stub
      function_name = MstubModel.prototype.save.prototype.constructor.name;
      function_name.should.eql('save_stub');
      
      // Assert method find is stub
      function_name = MstubModel.find.name;
      function_name.should.eql('find_stub');

      // Unstub only method save
      ms.munstub(MstubModel, 'save');

      // Assert method save is back
      function_name = MstubModel.prototype.save.prototype.constructor.name;
      function_name.should.eql('save');

      // Assert metdhod find is stub
      function_name = MstubModel.find.name;
      function_name.should.eql('find_stub');

      done();
    });
  });

});
