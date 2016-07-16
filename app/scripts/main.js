$(function() {
    "use strict";
    var contacts = [];
    // var contactToAdd;
    var contact = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        street: '',
        city: '',
        state: ''
    };

    // $('.submit-contact').click(addContact);
    $('form').on('submit', function(e) {
        addContact();
        return false;
    })

    $('.contacts-list').hide();

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
        // console.log(contactToAdd);
        contacts.push(contactToAdd);
        // console.log(contacts);
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
                if (prop === 'firstName') {
                    $('.current-contact').append('<h1>' + contacts[contactToDisplay].completeName() + '</h1>');
                }
                $('.current-contact').append('<p>' + contacts[contactToDisplay][prop] + '</p>');
            }

            // contactToAdd[prop] = $('#' + prop).val();
            // $('#' + prop).val('');
        }

    }
});
