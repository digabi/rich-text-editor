expect = require("chai").expect

bjq = require "../src/bacon.jquery"

twice = (x) -> x * 2
Bacon = require "baconjs"
ModelBacon = require "bacon.model"
model = Bacon.Model

describe "Node.js specific", ->
  it "exports original Bacon.$", ->
    expect(bjq).to.equal(Bacon.$)
  it "shares the same bacon with model", ->
    expect(bjq).to.equal(ModelBacon.$)
