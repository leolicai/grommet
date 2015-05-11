// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var __path__ = '../../mocks/components/Activity-mock';

var ReactTestUtils = require('../../mocks/ReactTestUtils');
var IndexQuery = require('../../../src/js/utils/IndexQuery');
var expect = require('expect');

describe('Grommet Activity', function() {
  it('loads a basic Activity component', function() {

    var Activity = require(__path__).successActivity();

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var Component = TestUtils.renderIntoDocument(<Activity />);

    ReactTestUtils.componentShouldExist(Component, 'index');
  });

  it('loads Activity component with query', function(done) {

    var Activity = require(__path__).successActivity();

    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    var query = ''
    var _onQuery = function(data) {
      query = data.text;
    };
    var queryProp = IndexQuery.create('');
    var Component = TestUtils.renderIntoDocument(
      <Activity query={queryProp} onQuery={_onQuery} />
    );

    ReactTestUtils.componentShouldExist(Component, 'index');
    ReactTestUtils.componentShouldExist(Component, 'search__input');

    var searchNode = TestUtils.findRenderedDOMComponentWithClass(Component, 'search__input');
    TestUtils.Simulate.change(searchNode, {target: {value: 'New Query'}});

    setTimeout(function() {
      expect(query).toBe('New Query');
      done();
    }, 10);
  });
});