
(function ($) {

  "use strict";

  $('.datetimepicker').datetimepicker({
    allowInputToggle: true,
    showClose: true,
    showClear: true,
    showTodayButton: true,
    format: "YYYY-MM-DD hh:mm:ss A",
    icons: {
      time: 'fa fa-clock-o',

      date: 'fa fa-calendar-o',

      up: 'fa fa-chevron-up',

      down: 'fa fa-chevron-down',

      previous: 'fa fa-chevron-left',

      next: 'fa fa-chevron-right',

      today: 'fa fa-chevron-up',

      clear: 'fa fa-trash',

      close: 'fa fa-close'
    },

  });

})(jQuery);

