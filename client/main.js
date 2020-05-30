import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { TAPi18n } from 'meteor/tap:i18n';

import './main.html';
import '../imports/ui/body.js';
import '../imports/api/router.js';

getUserLanguage = function () {
  return "ru";
};

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("showLoadingIndicator", true);

    TAPi18n.setLanguage(getUserLanguage())
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
  });
}

document.addEventListener("click", function(e) {
  if (e.target.nodeName == "LI") {
    e.target.classList.toggle("strikethrough");
  }
});
