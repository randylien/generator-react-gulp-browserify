/** @jsx React.DOM */

jest.dontMock('../Timer');

describe('Timer', function () {
    var Timer = require('../Timer');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var timer = null;

    beforeEach(function () {
        timer = TestUtils.renderIntoDocument(<Timer/>);
    });

    it('increments seconds elapsed with each tick', function () {
        expect(timer.state.secondsElapsed).toBe(0);
        timer.tick();
        expect(timer.state.secondsElapsed).toBe(1);
    });

    it('registers tick to run once each second', function () {
        expect(setInterval.mock.calls.length).toBe(1);
        expect(setInterval.mock.calls[0][0]).toBe(timer.tick);
        expect(setInterval.mock.calls[0][1]).toBe(1000);
    });
});

