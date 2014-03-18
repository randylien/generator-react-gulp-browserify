/** @jsx React.DOM */

var UIBuilder = React.createClass({
    render: function() {
        return (
            <div className="ui-builder">
                This is UI builder container.
            </div>
        );
    }
});


React.renderComponent(<UIBuilder />, document.getElementById("content"));
