$(function() {
  'use strict';
  var contacts = [];

  var contact = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: ''
  };
  // $('#add-phone').click(function(e) {
  //   $('.phone-label').toggle();
  //   $('#phoneNumber2').toggle();
  //   // return false;

  // })

  $('form').on('submit', function(e) {
    addContact();
    return false;
  })

  $('.contacts-list').hide();
  $('.current-contact').hide();

  function addContact() {
    event.preventDefault();
    var contactToAdd = Object.create(contact);
    for (var prop in contactToAdd) {
      contactToAdd[prop] = $('#' + prop).val();
      $('#' + prop).val('');
    }
    contactToAdd.completeName = function() {
      return this.firstName + ' ' + this.lastName;
    };

    contactToAdd.completeAddress = function() {
      return this.street + ', ' + this.city + ', ' + this.state;
    }

    contacts.push(contactToAdd);

    renderContactsList();
  }

  function renderContactsList() {
    $('.contacts-ul').html('');
    var contactsLength = contacts.length;
    for (var i = 0; i < contactsLength; i++) {
      var link = '<a href="#" class="' + i + '">' + contacts[i].completeName() + '</a>';
      $('.contacts-ul').append('<li>' + link + '</li>');
      $('.' + i).click(displayContact);
    }
    $('.contacts-list').show();
  }

  function displayContact() {

    $('.current-contact').html('');
    var contactToDisplay = $(event.target).attr('class');
    for (var prop in contacts[contactToDisplay]) {
      if (typeof contacts[contactToDisplay][prop] !== 'function') {

        switch(prop) {
          case 'firstName': {
            $('.current-contact').append('<h1>' + contacts[contactToDisplay].completeName() + '</h1>');
            $('.current-contact').append('<p>First Name: ' + contacts[contactToDisplay][prop] + '</p>');
            break;
          }
          case 'lastName': {
            $('.current-contact').append('<p>Last Name: ' + contacts[contactToDisplay][prop] + '</p>');
            break;
          }
          case 'phoneNumber': {
            $('.current-contact').append('<p>Phone Number: ' + contacts[contactToDisplay][prop] + '</p>');
            $('.current-contact').append('Addresses:<ul class="address-list"></ul>')
            break;
          }
          case 'street': {
            $('.address-list').append('<li>' + contacts[contactToDisplay].completeAddress() + '</li>');
            break;
          }
          case 'city': {
          }
          case 'state': {

          }
          default: {
            console.log('Something went wrong!');
          }
        }
      }
    }
    $('.current-contact').show('');
  }
});
