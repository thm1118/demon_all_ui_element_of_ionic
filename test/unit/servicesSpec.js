'use strict';

describe('服务单元测试', function() {

  // load modules
  beforeEach(module('starter.services'));

  // Test service availability
  it('检查phone服务是否有效', inject(function(PhoneService) {
      expect(PhoneService).toBeDefined();
    }));
});