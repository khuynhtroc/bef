(function($){
  $(function(){

    var window_width = $(window).width();

    // convert rgb to hex value string
    function rgb2hex(rgb) {
      if (/^#[0-9A-F]{6}$/i.test(rgb)) { return rgb; }

      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

      if (rgb === null) { return "N/A"; }

      function hex(x) {
          return ("0" + parseInt(x).toString(16)).slice(-2);
      }

      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    $('.dynamic-color .col').each(function () {
      $(this).children().each(function () {
        var color = $(this).css('background-color'),
            classes = $(this).attr('class');
        $(this).html(rgb2hex(color) + " " + classes);
        if (classes.indexOf("darken") >= 0 || $(this).hasClass('black')) {
          $(this).css('color', 'rgba(255,255,255,.9');
        }
      });
    });


    // Floating-Fixed table of contents
    setTimeout(function() {
      var tocWrapperHeight = 500; // Max height of ads.
      var tocHeight = $('.toc-wrapper .table-of-contents').length ? $('.toc-wrapper .table-of-contents').height() : 0;
      var socialHeight = 100; // Height of unloaded social media in footer.
      var footerOffset = $('footer').first().length ? $('footer').first().offset().top : 0;
      var bottomOffset = footerOffset - socialHeight - tocHeight - tocWrapperHeight;

      if ($('nav').length) {
        $('.toc-wrapper').pushpin({
          top: $('nav').height(),
          bottom: bottomOffset
        });
      }
      else 
      	if ($('#index-banner').length) {
        $('.toc-wrapper').pushpin({
          top: $('#index-banner').height(),
          bottom: bottomOffset
        });
      }
      else {
        $('.toc-wrapper').pushpin({
          top: 0,
          bottom: bottomOffset
        });
      }
    }, 100);



    


    // Github Latest Commit
    // if ($('.github-commit').length) { // Checks if widget div exists (Index only)
    //   $.ajax({
    //     url: "https://api.github.com/repos/dogfalo/materialize/commits/master",
    //     dataType: "json",
    //     success: function (data) {
    //       var sha = data.sha,
    //           date = jQuery.timeago(data.commit.author.date);
    //       if (window_width < 1120) {
    //         sha = sha.substring(0,7);
    //       }
    //       $('.github-commit').find('.date').html(date);
    //       $('.github-commit').find('.sha').html(sha).attr('href', data.html_url);
    //     }
    //   });
    // }

    // Toggle Flow Text
    var toggleFlowTextButton = $('#flow-toggle');
    toggleFlowTextButton.click( function(){
      $('#flow-text-demo').children('p').each(function(){
          $(this).toggleClass('flow-text');
        });
    });

//    Toggle Containers on page
    var toggleContainersButton = $('#container-toggle-button');
    toggleContainersButton.click(function(){
      $('body .browser-window .container, .had-container').each(function(){
        $(this).toggleClass('had-container');
        $(this).toggleClass('container');
        if ($(this).hasClass('container')) {
          toggleContainersButton.text("Turn off Containers");
        }
        else {
          toggleContainersButton.text("Turn on Containers");
        }
      });
    });

    // Detect touch screen and enable scrollbar if necessary
    function is_touch_device() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }
    if (is_touch_device()) {
      $('#nav-mobile').css({ overflow: 'auto'});
    }

    // Set checkbox on forms.html to indeterminate
    var indeterminateCheckbox = document.getElementById('indeterminate-checkbox');
    if (indeterminateCheckbox !== null)
      indeterminateCheckbox.indeterminate = true;


    // Plugin initialization
    $('.carousel.carousel-slider').carousel({full_width: true});
    $('.carousel').carousel();
    $('.slider').slider({full_width: true});
    $('.parallax').parallax();
    $('.scrollspy').scrollSpy();
    $('.button-collapse').sideNav({'edge': 'left'});
    $('.datepicker').pickadate({selectYears: 20});
    $('select').not('.disabled').material_select();
    $(".dropdown-button").dropdown();
    //Add responsive image class to all images in #page-content div
    $( "#page-content img" ).addClass( "responsive-img" );

    $('input#input_text, textarea#review_content').characterCounter();
    

    $("div.lazy").lazyload({
          effect : "fadeIn"
      });
    $("img.lazy").lazyload({
          effect : "fadeIn"
      });


     $("#review-form").submit(function()
        {

          event.preventDefault();
        
          var data = $('form#review-form').serialize();
              $.ajax({
                type : 'POST', 
                url  : 'https://store.mageplaza.com/mageplaza/review/ajaxSubmit', 
                data : data,
                dataType: "json",
                success :  function(response){
                  if(response.alert == 'success'){
                    Materialize.toast(response.msg, 3000, 'green');
                    $('#review-form')[0].reset();
                  } else{
                    Materialize.toast(response.msg, 3000, 'red');
                  }
                }
                });

    });


    $("#subscribe-form").submit(function()
        {

          event.preventDefault();
        
          var data = $('form#subscribe-form').serialize();
              $.ajax({
                type : 'POST', 
                url  : 'https://store.mageplaza.com/mageplaza/subscribe/ajaxSubscribe', 
                data : data,
                dataType: "json",
                success :  function(response){
                  if(response.alert == 'success'){
                    Materialize.toast(response.msg, 3000, 'green');
                    // $('#subscribe-form')[0].reset();
                  } else{
                    Materialize.toast(response.msg, 3000, 'red');
                  }
                }
                });

    });

    $("#notifyme-form").submit(function()
        {

          event.preventDefault();

          $('#notify-error-msg').html(''); //clean up msg
        
          var data = $('form#notifyme-form').serialize();
              $.ajax({
                type : 'POST', 
                url  : 'https://services.mageplaza.com/email/notifyme.php', 
                data : data,
                dataType: "json",
                success :  function(response){
                  if(response.status == '200'){
                    $('#notify-me-modal').modal('close');
                    Materialize.toast(response.msg, 3000, 'green');
                  } else{
                    
                    $('#notify-error-msg').html(response.msg);

                    Materialize.toast(response.msg, 3000, 'red');
                  }
                }
                });

    });


  jQuery('#kb-content > h2:eq(0)').before(jQuery('#top-ads'));
  // jQuery('#m2md-content > h2:eq(0)').before(jQuery('#m2md-series'));
  jQuery('#m2md-series').appendTo('#m2md-content > p:eq(1)');

   $('.modal-trigger').leanModal();
    $('.materialboxed').materialbox();
    $('.collapsible').collapsible({
      accordion : false
    });
    $('ul.tabs').tabs();

    if($('#review-section .card-content li').size() == 0){
      $('#review-section').hide();
    }

    $( "#toTop" ).scrollTop( 300 );

    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
    );

    // Fly nav
     // show/hide nav
      function mpFlyNav() {
        if($('.mp-offset-flynav').offset()){ //check the flynav is exist
          if ($(window).scrollTop() > $('.mp-offset-flynav').offset().top) {
            $('.mp-fly-nav').fadeIn(500);
          } else {
            $('.mp-fly-nav').fadeOut(500);
          }
        }
        
      }
      mpFlyNav();
      $(window).scroll(function() {
        mpFlyNav();
      });

       // collapse nav button
      // $(".button-collapse").sideNav();


      // JS cookie produce

      function getParameterByName(name, url) {
          if (!url) url = window.location.href;
          name = name.replace(/[\[\]]/g, "\\$&");
          var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, " "));
      }

      var affCode = getParameterByName('u');

      if(affCode){
        Cookies.set('mprc', affCode, { expires: 7 });
      }

      //check is product page && has cookie mprc
      if($('#mprc').val() && Cookies.get('mprc')){
          $('#mprc').val(Cookies.get('mprc')); //add refer code to submit form
      }







    

  }); // end of document ready
})(jQuery); // end of jQuery name space

