(function($) {  
    $.fn.reverseText = function(params) {  
        params = $.extend( {minlength: 0, maxlength: 99999}, params);  
        this.each(function() {     
            var $t = $(this);  
            var origText = $t.text(), newText = '';  
            if (origText.length >= params.minlength &&  origText.length <= params.maxlength) {  
                for (var i = origText.length-1; i >= 0; i--) {
                    newText += origText.substr(i, 1);  
                }
                $t.text(newText);  
            }  
        });  
        return this;  
    }; 
})(jQuery);  

var listItemTemplateBefore = '<li class="list-group-item" style="display: none"><span class="glyphicon glyphicon-edit"></span>';
var listItemTemplateAfter = '<span class="glyphicon glyphicon-remove pull-right"></span></li>';

$(document).ready(function() {
    updateClickListeners();
    $("#add-btn").click(function() {
        var name = $("#star-name").val();
        if (name) {
            var newItem = $(listItemTemplateBefore + name + listItemTemplateAfter).hide();
            $("#star-list").append(newItem);
            newItem.slideDown();
            updateClickListeners();
            $("#star-list").showNumberOfChildren();
        }
    });
    $("#toggle-btn").click(function() {
        $("#container *").slideToggle("slow");

        $("#hide-btn").toggleClass("btn-danger");
        $("#hide-btn").toggleClass("btn-success");

        $("#hide-btn span").toggleClass("glyphicon-remove");
        $("#hide-btn span").toggleClass("glyphicon-resize-full");
    });
});

function updateClickListeners() {
    $("#star-list .glyphicon-remove").click(function() {
        $(this).parent().hide('slow', function() {
            $(this).remove();
            $("#star-list").showNumberOfChildren();
            $("#stat").reverseText();  
        });
    });
}

jQuery.fn.showNumberOfChildren = function() {
    $("#stat").html("The element has " + this.children().length + " children.");
}
