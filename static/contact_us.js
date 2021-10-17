$(function () {

   /* Functions */

   let loadForm = function () {
     let btn = $(this);
     $.ajax({
       url: btn.attr("data-url"),
       type: 'get',
       dataType: 'json',
       beforeSend: function () {
         $("#contact .modal-content").html("");
         $("#contact").modal("show");
       },
       success: function (data) {
         $("#contact .modal-content").html(data.html_form);
       }
     });
   };

   let sendForm = function () {
     let form = $(this);
     $.ajax({
       url: form.attr("action"),
       data: form.serialize(),
       type: form.attr("method"),
       dataType: 'json',
       success: function (data) {
         if (data.form_is_valid) {
           $("#contact").modal("hide");
         }
         else {
           $("#contact .modal-content").html(data.html_form);
         }
       }
     });
     return false;
   };


   /* Binding */

   // Open contact form
   $(".js-contact").click(loadForm);
   // Send message
   $("#contact").on("submit", ".js-contact-form", sendForm);

});