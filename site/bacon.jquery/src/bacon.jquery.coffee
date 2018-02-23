init = (Bacon, BaconModel, $) ->
  nonEmpty = (x) -> x.length > 0
  assertArrayOrJQueryObject = (x) ->
    unless x instanceof jQuery or x instanceof Array
      throw new Error('Value must be either a jQuery object or an Array of jQuery objects')
  asJQueryObject = (x) ->
    if x instanceof jQuery then x
    else
      obj = $()
      obj = obj.add(element) for element in x when element instanceof jQuery
      obj
  _ = {
  indexOf: if Array::indexOf
    (xs, x) -> xs.indexOf(x)
  else
    (xs, x) ->
      for y, i in xs
        return i if x == y
      -1
  }

  Bacon.$.Model = Bacon.Model

  # Input element bindings
  Bacon.$.textFieldValue = (element, initValue) ->
    get = -> element.val() || ""
    autofillPoller = ->
      Bacon.interval(50).take(10).map(get).filter(nonEmpty).take 1
    events = element.asEventStream("keyup input change")
      .merge(element.asEventStream("cut paste").delay(1))
      .merge(autofillPoller())

    Bacon.Binding {
      initValue,
      get,
      events,
      set: (value) -> element.val(value)
    }
  Bacon.$.checkBoxValue = (element, initValue) ->
    Bacon.Binding {
      initValue,
      get: -> element.prop("checked")||false,
      events: element.asEventStream("change"),
      set: (value) -> element.prop "checked", value
    }

  Bacon.$.selectValue = (element, initValue) ->
    Bacon.Binding {
      initValue,
      get: -> element.val(),
      events: element.asEventStream("change"),
      set: (value) -> element.val value
    }

  Bacon.$.radioGroupValue = (radios, initValue) ->
    assertArrayOrJQueryObject(radios)
    radios = asJQueryObject(radios)
    Bacon.Binding {
      initValue,
      get: -> radios.filter(":checked").first().val(),
      events: radios.asEventStream("change"),
      set: (value) ->
        radios.each (i, elem) ->
          $(elem).prop "checked", elem.value is value
    }

  Bacon.$.intRadioGroupValue = (radios, initValue) ->
    radioGroupValue = Bacon.$.radioGroupValue(radios)
    Bacon.Binding {
      initValue,
      get: ->
        value = radioGroupValue.get()
        if value?
          parseInt(value)
        else
          value
      events: radioGroupValue.syncEvents()
      set: (value) ->
        strValue = if value?
            Number(value).toString()
          else
            value
        radioGroupValue.set strValue
    }

  Bacon.$.checkBoxGroupValue = (checkBoxes, initValue) ->
    assertArrayOrJQueryObject(checkBoxes)
    checkBoxes = asJQueryObject(checkBoxes)
    Bacon.Binding {
      initValue,
      get: ->
        checkBoxes.filter(":checked").map((i, elem) -> $(elem).val()).toArray()
      events: checkBoxes.asEventStream("change"),
      set: (value) ->
        checkBoxes.each (i, elem) ->
          $(elem).prop "checked", _.indexOf(value, $(elem).val()) >= 0
    }

  # AJAX
  Bacon.$.ajax = (params, abort) -> Bacon.fromPromise $.ajax(params), abort
  Bacon.$.ajaxGet = (url, data, dataType, abort) -> Bacon.$.ajax({url, dataType, data}, abort)
  Bacon.$.ajaxGetJSON = (url, data, abort) -> Bacon.$.ajax({url, dataType: "json", data}, abort)
  Bacon.$.ajaxPost = (url, data, dataType, abort) -> Bacon.$.ajax({url, dataType, data, type: "POST"}, abort)
  Bacon.$.ajaxGetScript = (url, abort) -> Bacon.$.ajax({url, dataType: "script"}, abort)
  Bacon.$.lazyAjax = (params) -> Bacon.once(params).flatMap(Bacon.$.ajax)
  Bacon.Observable::ajax = -> @flatMapLatest Bacon.$.ajax

  # jQuery Deferred
  Bacon.Observable::toDeferred = ->
    value = undefined
    dfd = $.Deferred()
    @take(1).endOnError().subscribe((evt) ->
        if evt.hasValue()
          value = evt.value()
          dfd.notify(value)
        else if evt.isError()
          dfd.reject(evt.error)
        else if evt.isEnd()
          dfd.resolve(value)
        )
    dfd

  # jQuery DOM Events

  eventNames = [
    "keydown", "keyup", "keypress",
    "click", "dblclick", "mousedown", "mouseup",
    "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover",
    "dragstart", "drag", "dragenter", "dragleave", "dragover", "drop", "dragend",
    "resize", "scroll", "select", "change",
    "submit",
    "blur", "focus", "focusin", "focusout",
    "load", "unload" ]
  events = {}

  for e in eventNames 
    do (e) ->
      events[e + 'E'] = (args...) -> @asEventStream e, args...

  # jQuery Effects

  effectNames = [
    "animate", "show", "hide", "toggle",
    "fadeIn", "fadeOut", "fadeTo", "fadeToggle",
    "slideDown", "slideUp", "slideToggle" ]
  effects = {}

  for e in effectNames 
    do (e) ->
      effects[e + 'E'] = (args...) -> Bacon.fromPromise @[e](args...).promise()

  if $?.fn
    $.fn.extend events
    $.fn.extend effects
    $.fn.asEventStream = Bacon.$.asEventStream 

  Bacon.$

if module?
  Bacon = require("baconjs")
  BaconModel = require("bacon.model")
  $ = require("jquery")
  module.exports = init(Bacon, BaconModel, $)
else
  if typeof define == "function" and define.amd
    define ["bacon", "bacon.model", "jquery"], init
  else
    init(this.Bacon, this.BaconModel, this.$)
