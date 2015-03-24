React = window.React = require("react")
Timer = require("./ui/Timer.coffee")
mountNode = document.getElementById("app")
TodoList = React.createClass(
  displayName: "TodoList"
  render: ->
    createItem = (itemText) ->
      React.createElement "li", null, itemText

    React.createElement "ul", null, @props.items.map(createItem)
)
TodoApp = React.createClass(
  displayName: "TodoApp"
  getInitialState: ->
    items: []
    text: ""

  onChange: (e) ->
    @setState text: e.target.value
    return

  handleSubmit: (e) ->
    e.preventDefault()
    nextItems = @state.items.concat([@state.text])
    nextText = ""
    @setState
      items: nextItems
      text: nextText

    return

  render: ->
    React.createElement "div", null, React.createElement(TodoList,
      items: @state.items
    ), React.createElement("form",
      onSubmit: @handleSubmit
    , React.createElement("input",
      onChange: @onChange
      value: @state.text
    ), React.createElement("button", null, "Add #" + (@state.items.length + 1))), React.createElement(Timer, null)
)
React.render React.createElement(TodoApp, null), mountNode
