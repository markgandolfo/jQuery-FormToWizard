/* Origital created by jankoatwarpspeed.com - http://www.jankoatwarpspeed.com/post/2009/09/28/webform-wizard-jquery.aspx*/

(function($) {
  $.fn.formToWizard = function(options, nextCallBack, prevCallback) {
    options = $.extend({  
      submitButton : "input[type=submit]",
      validate : false 
    }, options); 
  
    var element = this,
        steps = $(element).find("fieldset"),
        count = steps.size(),
        submit = $(element).find(options.submitButton);

    submit.hide();
    $(element).before("<ul id='steps'></ul>");

    steps.each(function(i) {
      $(this).wrap("<div id='step" + i + "'></div>");
      $(this).append("<p id='step" + i + "commands'></p>");

      var name = $(this).find("legend").html();
      $("#steps").append("<li id='stepDesc" + i + "'>Step " + (i + 1) + "<span>" + name + "</span></li>");

      if (i == 0) {
        createNextButton(i);
        selectStep(i);
      }
      else if (i == count - 1) {
        $("#step" + i).hide();
        createPrevButton(i);
      }
      else {
        $("#step" + i).hide();
        createPrevButton(i);
        createNextButton(i);
      }
    });

    function createPrevButton(i) {
      var stepName = "step" + i;
      $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Prev' class='prev'>< Back</a>");

      $("#" + stepName + "Prev").bind("click", function(e) {
        $("#" + stepName).hide();
        $("#step" + (i - 1)).show();
        submit.hide();
        selectStep(i - 1);
        prevCallback();
      });
    }

    function createNextButton(i) {
      var stepName = "step" + i;
      $("#" + stepName + "commands").append("<a href='#' id='" + stepName + "Next' class='next'>Next ></a>");

      $("#" + stepName + "Next").bind("click", function(e) {
        if (options.validate) { 
          var stepIsValid = true; 
          $("#" + stepName + " :input").each( function(index) { 
            var xy = element.validate().element($(this)); 
            if(xy == undefined) xy = true; 
            stepIsValid = xy && stepIsValid; 
          }); 
          if (!stepIsValid) { 
            return false; 
          }; 
        };
        $("#" + stepName).hide();
        $("#step" + (i + 1)).show();
        if (i + 2 == count) {
          submit.show();
        }
        
        selectStep(i + 1);
        nextCallBack();
      });
    }

    function selectStep(i) {
      $("#steps li").removeClass("current");
      $("#stepDesc" + i).addClass("current");
    }
  }
})(jQuery); 