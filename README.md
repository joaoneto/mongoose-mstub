[![Build Status](https://travis-ci.org/joaoneto/mongoose-mstub.png?branch=master)](https://travis-ci.org/joaoneto/mongoose-mstub)

# mongoose-mstub
This is a lightweight method stub for mongoose models.

## Install
    npm install mongoose-mstub

## Usage
    var mongoose = require('mongoose'),
      mstub = require('mongoose-mstub');

    UserSchema = mongoose.Schema({
      name: String,
      email: String
    });

    User = mongoose.model('User', UserSchema);

    mstub(User, 'save', function (callback) {
      callback('Stub my err');
    });

    User.save(function (err) {
      console.log(err);
    });

    unmstub(User);

## Mocha example
    // Test dependencies
    var mongoose = require('mongoose'),
      mstub = require('mongoose-mstub'),
      should = require('should');

    // Load model
    var User = require('../models/user');

    describe('User unit test', function () {
      it('Should save user', function (done) {
        mstub(User, 'save', function (callback) { callback(); } );
        var user = new User({ name: 'Foo bar', email: 'foo@example.com' });
        user.save(function (err) {
          should.not.exists(err);  // assert is not returning err
          unmstub(User, 'save');
          done();
        });
      });

      it('Should NOT save user', function (done) {
        mstub(User, 'save', function (callback) { callback('Fail!'); } );
        var user = new User({ name: 'Foo bar', email: 'foo@example.com' });
        user.save(function (err) {
          should.exists(err);  // assert is not returning err
          unmstub(User, 'save'); // or unmstub
          done();
        });
      });

    });

## License
Copyright (c) 2013 João Pinto Neto

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



