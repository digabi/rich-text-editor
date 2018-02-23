var expect = chai.expect

describe('bacon.jquery', function() {
  describe('textFieldValue', function() {
    var field
    beforeEach(function() {
      $('#bacon-dom').html('<input type="text" id="text" value="defaultVal">')
      field = $('#bacon-dom #text')
    })

    describe('with initVal', function() {
      it('sets value to DOM', function() {
          var model = Bacon.$.textFieldValue(field, 'initVal')
          expect(field.val()).to.equal('initVal')
      })
      it('sets the initVal as the initial value of the model', function() {
        var model = Bacon.$.textFieldValue(field, 'initVal')
        specifyValue(model, 'initVal')
      })
    })

    describe('without initVal', function() {
      it('leaves DOM unaffected', function() {
          var model = Bacon.$.textFieldValue(field)
          expect(field.val()).to.equal('defaultVal')
      })
      it('uses value from DOM as initial value of the model', function() {
        var model = Bacon.$.textFieldValue(field)
        specifyValue(model, 'defaultVal')
      })
      describe('with empty default value', function() {
        it('waits for browser to autofill textfield', function(done) {
          field.val('')
          var model = Bacon.$.textFieldValue(field)
          model.filter(function (v) {
              return v
          }).onValue(function() {
            specifyValue(model, 'newVal')
            done()
          })
          field.val("newVal")
        })
      })
    })

    describe('when setting value of model', function() {
      it('sets value to DOM', function() {
          Bacon.$.textFieldValue(field).set('newVal')
          expect(field.val()).to.equal('newVal')
      })
    })

    describe('when DOM value changes', function() {
      it('updates value of model', function() {
        var model = Bacon.$.textFieldValue(field)
        field.val("newVal")
        field.trigger("keyup")
        specifyValue(model, "newVal")
      })

      it('ignores duplicates', function() {
        var model = Bacon.$.textFieldValue(field)
        field.val("newVal")
        field.trigger("keyup")
        specifyValue(model, "newVal")
        var values = collectValues(model)
        field.trigger("keyup")
        field.trigger("keyup")
        expect(values).to.deep.equal(["newVal"])
      })
    })

    describe('when element is not found', function() {
      it('returns empty string as value', function() {
        var model = Bacon.$.textFieldValue($('.asdfqwer'))
        specifyValue(model, '')
      })
    })
  })

  describe('checkBoxValue', function() {
    var field
    beforeEach(function() {
      $('#bacon-dom').html('<input type="checkbox" id="checkbox">')
      field = $('#bacon-dom #checkbox')
    })

    describe('with initVal', function() {
      it('sets value to DOM', function() {
          var model = Bacon.$.checkBoxValue(field, true)
          expect(field.prop("checked")).to.equal(true)
      })
      it('sets the initVal as the initial value of the model', function() {
        var model = Bacon.$.checkBoxValue(field, true)
        specifyValue(model, true)
      })
    })

    describe('without initVal', function() {
      it('leaves DOM unaffected', function() {
          var model = Bacon.$.checkBoxValue(field)
          expect(field.prop("checked")).to.equal(false)
      })
      it('uses value from DOM as initial value of the model', function() {
        var model = Bacon.$.checkBoxValue(field)
        specifyValue(model, false)
      })
    })

    describe('when setting value of model', function() {
      it('sets value to DOM', function() {
          Bacon.$.checkBoxValue(field).set(true)
          expect(field.prop("checked")).to.equal(true)
      })
      it('leaves defaultChecked property as is', function() {
          Bacon.$.checkBoxValue(field).set(true)
          expect(field.prop("defaultChecked")).to.equal(false)
      })
    })
    describe('when DOM value changes', function() {
      it('updates value of model', function() {
        var model = Bacon.$.checkBoxValue(field)
        field.trigger("click")
        specifyValue(model, true)
      })
    })
    describe('when element is not found', function() {
      it('returns false as value', function() {
        var model = Bacon.$.checkBoxValue($('.asdfqwer'))
        specifyValue(model, false)
      })
    })
  })

  describe('selectValue', function() {
    var field
    beforeEach(function() {
      $('#bacon-dom').html('<select id="select"><option value="a">A</option><option value="b" selected>B</option></select>')
      field = $('#bacon-dom #select')
    })

    describe('with initVal', function() {
      it('sets value to DOM', function() {
        var model = Bacon.$.selectValue(field, 'a')
        expect(field.val()).to.equal('a')
      })
      it('sets the initVal as the initial value of the model', function() {
        var model = Bacon.$.selectValue(field, 'a')
        specifyValue(model, 'a')
      })
    })

    describe('without initVal', function() {
      it('leaves DOM unaffected', function() {
        var model = Bacon.$.selectValue(field)
        expect(field.val()).to.equal('b')
      })
      it('uses value from DOM as initial value of the model', function() {
        var model = Bacon.$.selectValue(field)
        specifyValue(model, 'b')
      })
    })

    describe('when setting value of model', function() {
      it('sets value to DOM', function() {
        Bacon.$.selectValue(field).set('a')
        expect(field.val()).to.equal('a')
      })
    })
    describe('when DOM value changes', function() {
      it('updates value of model', function() {
        var model = Bacon.$.selectValue(field)
        field.val("a")
        field.trigger("change")
        specifyValue(model, "a")
      })
    })
  })

  describe('selectValue without any options', function() {
    it('sets `null` as initial value of the model', function() {
      $('#bacon-dom').html('<select id="select"></select>')
      var model = Bacon.$.selectValue($('#bacon-dom #select'))
      specifyValue(model, null)
    })
  })

  describe('selectValue when element is not found', function() {
    it('sets `undefined` as initial value of the model', function() {
      var model = Bacon.$.selectValue($('.asdfqwer'))
      specifyValue(model, undefined)
    })
  })

  describe('radioGroupValue', function() {
    testRadioGroupValueModel(Bacon.$.radioGroupValue, "a", "b")
  })

  describe('intRadioGroupValue', function() {
    testRadioGroupValueModel(Bacon.$.intRadioGroupValue, 1, 2)
    testRadioGroupValueModel(Bacon.$.intRadioGroupValue, 0, 23)
  })

  testEventHelper('click')
  testEventHelper('keyup')
  testEventHelper('keydown')
  testEventHelper('mouseup')

  $.mockjax({
      url: "/test",
      responseTime: 0,
      responseText: "good"
    })

  describe("Observable.prototype.toDeferred", function(){
    it("Converts EventStream into jQuery Deferred", function() {
      testDeferred(Bacon.fromArray([1,2,3]), [1], [])
    })

    it("Converts Property into jQuery Deferred", function() {
      testDeferred(Bacon.fromArray([1,2,3]).toProperty(), [1], [])
    })

    it("Respects Property initial value", function() {
      testDeferred(Bacon.fromArray([1,2,3]).toProperty(0), [0], [])
    })

    it("Converts Errors", function() {
      testDeferred(Bacon.fromArray([new Bacon.Error("err1"), new Bacon.Error("err2")]), [], ["err1"])
    })

    function testDeferred(observable, expectedValues, expectedErrors) {
      var values = [], errors = []
      observable.toDeferred().done(function(value) {
        values.push(value)
      }).fail(function(error) {
        errors.push(error)
      })
      expect(values).to.deep.equal(expectedValues)
      expect(errors).to.deep.equal(expectedErrors)
    }
  })

  describe("AJAX", function() {
    describe("Converts EventStream of requests into EventStream of responses", function() {
      expectStreamValues(Bacon.once({url:"/test"}).ajax(), ["good"])
    })
    describe("Converts Property of requests into EventStream of responses", function() {
      expectStreamValues(Bacon.once({url:"/test"}).toProperty().ajax(), ["good"])
    })
  })
})

function testRadioGroupValueModel(modelProvider, value1, value2) {
  var firstRadio = asTestValueObject(value1)
  var secondRadio = asTestValueObject(value2)

  describe('with initVal', function() {
    doTest('sets value to DOM', function(fields) {
      var model = modelProvider(fields, firstRadio.value)
      expect($(firstRadio.selector).prop("checked")).to.equal(true)
      expect($(secondRadio.selector).prop("checked")).to.equal(false)
    })
    doTest('sets the initVal as the initial value of the model', function(fields) {
      var model = modelProvider(fields, firstRadio.value)
      specifyValue(model, firstRadio.value)
    })
  })

  describe('without initVal', function() {
    doTest('leaves DOM unaffected', function(fields) {
      var model = modelProvider(fields)
      expect($(secondRadio.selector).prop("checked")).to.equal(true)
      expect($(firstRadio.selector).prop("checked")).to.equal(false)
    })
    doTest('uses value from DOM as initial value of the model', function(fields) {
      var model = modelProvider(fields)
      specifyValue(model, secondRadio.value)
    })
  })

  describe('when setting value of model', function() {
    doTest('sets value to DOM', function(fields) {
      modelProvider(fields).set(firstRadio.value)
      expect($(firstRadio.selector).prop("checked")).to.equal(true)
      expect($(secondRadio.selector).prop("checked")).to.equal(false)
    })
    doTest('leaves defaultChecked property as is', function(fields) {
      modelProvider(fields).set(firstRadio.value)
      expect($(firstRadio.selector).prop("defaultChecked")).to.equal(false)
      expect($(secondRadio.selector).prop("defaultChecked")).to.equal(true)
    })
  })

  describe('when DOM value changes', function() {
    doTest('updates value of model', function(fields) {
      var model = modelProvider(fields)
      $(secondRadio.selector).click()
      $(firstRadio.selector).click()
      specifyValue(model, firstRadio.value)
    })
  })

  describe('when elements are not found', function() {
    it('returns undefined as value', function() {
      var model = modelProvider($(".asdfqwer"))
      specifyValue(model, undefined)
    })
  })

  function doTest(name, f) {
    function setup() {
      var elements = $(firstRadio.html + secondRadio.html)
      elements.filter("input:last").attr("checked", "checked")
      $('#bacon-dom').html(elements)
    }
    describe("with single jQuery object", function() {
      before(setup)
      it(name, function() { f($(firstRadio.selector + "," + secondRadio.selector)) })
    })
    describe("with array of jQuery objects", function() {
      before(setup)
      it(name, function() { f([$(firstRadio.selector), $(secondRadio.selector)]) })
    })
  }

  function asTestValueObject(val) {
    return {
      value: val,
      selector: "#" + val.toString(),
      html: '<label for=":val">:val</label><input type="radio" id=":val" value=":val"><br>'.replace(/\:val/g, val.toString())
    }
  }
}

function expectStreamValues(stream, expectedValues) {
  var values = []
  before(function(done) {
    stream.onValue(function(value) { values.push(value) })
    stream.onEnd(done)
  })
  it("is an EventStream", function() {
    expect(stream instanceof Bacon.EventStream).to.be.ok()
  })
  it("contains expected values", function() {
    expect(values).to.deep.equal(expectedValues)
  })
}

function testEventHelper(eventName) {
  var methodName = eventName + "E"
  describe(methodName, function() {
    it("captures DOM events as EventStream", function() {
      $('#bacon-dom').html('<input type="text" id="text">')
      var el = $('#bacon-dom #text')
      var stream = el[methodName]()
      var values = collectValues(stream)
      el[eventName]()
      expect(values.length).to.equal(1)
    })
  })
}

function specifyValue(obs, expected) {
  var gotIt = false
  var value
  obs.onValue(function(v) {
    gotIt = true
    value = v
  })
  expect(gotIt).to.equal(true)
  expect(value).to.deep.equal(expected)
}

function collectValues(observable) {
  var values = [];
  observable.onValue(function(value) {
    return values.push(value);
  });
  return values;
}
