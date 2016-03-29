;
(function($, doc, win) {
  "use strict";

  function TechStack(el, opts) {
    this.$el = $(el);
    this.opts = opts;
    this.init();
  }

  function BuildStack(el, stack, areRows, rowQty, colType) {
    if ($.isArray(stack)) {
      var colSize = Math.floor(12 / stack.length);
      if(rowQty)
        colSize = Math.floor(12 / rowQty);
      var col = "sm";
      if(colType)
        col = colType;
      $.each(stack, function(index, value) {
        var currentContainer;
        if (!areRows) {
          currentContainer = $("<div class='tech-col col-"+col+"-" + colSize + "'><div class='tech-container'></div></div>");
          el.append(currentContainer);
          currentContainer = currentContainer.find(".tech-container");
        } else {
          currentContainer = $("<div class='row tech-row'></div>");
          el.append(currentContainer);
        }
        BuildStack(currentContainer, value, false, rowQty, colType);
      });
    } else {
      //set border-color
      var bordercolor = $(stack).attr('border-color');
      if (bordercolor)
        el.css('border-color', bordercolor);
      //set background-color
      var backgroundcolor = $(stack).attr('background-color');
      if (backgroundcolor)
        el.css('background-color', backgroundcolor);
      //is this a row or column
      var textType = (el.hasClass('tech-container'))?"tech-text":"tech-row-text";
      //set text
      var text = $(stack).attr('text');
      if(text)
        el.append("<p class='" + textType + "' >" + text + "</p>");
      //set textcolor
      var textcolor = $(stack).attr('text-color');
      if(textcolor)
        el.find('p').css('color',textcolor);
      //add child stack
      var childstack = $(stack).attr('childstack');
      if (childstack) {
        BuildStack(el, childstack, true, rowQty, colType);
      }
      //add items to row
      var items = $(stack).attr('items');
      if (items) {
        BuildStack(el, items, false, rowQty, colType);
      }
    }
  }

  TechStack.prototype.init = function() {
    BuildStack(this.$el, this.opts.techstack, true, this.opts.rowQty,this.opts.colType);
  }

  $.fn.techstack = function(opts) {
    return this.each(function() {
      new TechStack(this, opts);
    });
  };

})(jQuery, document, window);
