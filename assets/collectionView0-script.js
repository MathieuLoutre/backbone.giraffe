var Fruit = Giraffe.Model.extend({
  defaults: {
    name: null,
    color: null
  }
});

var Fruits = Giraffe.Collection.extend({
  model: Fruit
});

var FruitView = Giraffe.View.extend({
  template: '#fruit-template',

  initialize: function() {
    this.$el.css('background-color', this.model.get('color'));
  },

  onDelete: function() {
    // we could cheat and call this.dispose(), modify the collection instead
    this.parent.collection.remove(this.model);
  }
});

var FruitsView = Giraffe.View.extend({
  dataEvents: {
    'add collection': 'onAddItem',
    'remove collection': 'onRemoveItem'
  },

  onAddItem: function(fruit) {
    var itemView = new FruitView({model: fruit});
    this.attach(itemView);
  },

  onRemoveItem: function(fruit) {
    // fruit template assigns fruit.cid to div
    var itemView = Giraffe.View.getClosestView('#' + fruit.cid);
    itemView.dispose();
  },

  afterRender: function() {
    var my = this;
    this.collection.each(function (item) {
      my.onAddItem(item, my.collection);
    });

  }
});

var fruits = new Fruits([
  {name: 'Apple', color: '#0F0'},
  {name: 'Banana', color: '#FF0'},
  {name: 'Orange', color: '#FF7F00'}
]);

var fruitsView = new FruitsView({
  collection: fruits
});

fruitsView.attachTo('body');

setTimeout(function() {
  fruits.add([{
    name: 'Pink Grapefruit',
    color: '#C5363A'
  }]);
}, 300);