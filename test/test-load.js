/*global describe, beforeEach, it*/
'use strict';

var assert = require('yeoman-generator').assert;

describe('Angularify-Module generator load test', function () {
  it('can be imported without blowing up', function () {
    assert(require('../app/index') !== undefined);
    assert(require('../common/index') !== undefined);
    assert(require('../constant/index') !== undefined);
    assert(require('../controller/index') !== undefined);
    assert(require('../decorator/index') !== undefined);
    assert(require('../directive/index') !== undefined);
    assert(require('../factory/index') !== undefined);
    assert(require('../filter/index') !== undefined);
    assert(require('../home/index') !== undefined);
    assert(require('../provider/index') !== undefined);
    assert(require('../route/index') !== undefined);
    assert(require('../service/index') !== undefined);
    assert(require('../value/index') !== undefined);
    assert(require('../view/index') !== undefined);
  });
});
