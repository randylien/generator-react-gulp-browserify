React = require("react")
Timer = React.createClass(
  getInitialState: ->
    secondsElapsed: 0

  tick: ->
    @setState secondsElapsed: @state.secondsElapsed + 1
    return

  componentDidMount: ->
    @interval = setInterval(@tick, 1000)
    return

  componentWillUnmount: ->
    clearInterval @interval
    return

  render: ->
    return (React.DOM.div {}, [
      'Seconds Elapsed: ' + @state.secondsElapsed
    ])

)
module.exports = Timer
