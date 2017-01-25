'use strict';
module.exports = function(Guest) {
  Guest.sendEmail = function(req, cb) {
    // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs

    var helper = require('sendgrid').mail;
    var stringTemplate =
      '<style>a[class="bulletproof-button"] {' +
      '  display: block !important;' +
      '  width: auto !important;' +
      '  font-size: 80%;' +
      '  padding-left: 0 !important;' +
      '  padding-right: 0 !important;' +
      '}</style>' +
      '<table align="center"><tr><td  align="center">' +
      '<img align="center" src="https://invitationsapp.herokuapp.com/api/containers/images/download/' + req.eventphoto + '"></td></tr>' +
      '</table>' +
      '<HR>' +
      '<H2 align="center">' + req.eventname + '</H2>' +
      '<p align="center">Caro parceiro da instituição - ' + req.guestname + ', </p>' +
      '<p align="center">' + req.eventdescription + '</p>' +
      '<p align="center">Atenciosamente,</p>' +
      '<H4 align="center">' + req.hostname + '</H4>' +
      '<H4 align="center">' + req.hostaddress + '</H4>' +
      '<H4 align="center">' + req.hostphone + '</H4>' +
      '<HR>' +
      '<table align="center"><tr><td align="center" style="-webkit-border-radius: 8px; -moz-border-radius: 8px; border-radius: 8px; font-size: 16px;" bgcolor="#FF6666">' +
      '<a align="center" href="' + req.confirmationlink + '" class="bulletproof-button" target="_blank" style="height: px; width: 250px; font-size: 16px; line-height: px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; padding: 12px 12px 12px 12px; text-decoration: none; color: #ffffff; text-decoration: none; -webkit-border-radius: 8px; -moz-border-radius: 8px; border-radius: 8px; border: 1px solid #FF6666; display: inline-block;">CONFIRMAR</a>' +
      '</td></tr></table>' +
      '<table align="center">' +
      '<tr><td align="center"><H4 align="center">This e-mail was generated by </H4></td></tr>' +
      '<tr><td  align="center">' +
      '<img align="center" src="https://invitationsapp.herokuapp.com/api/containers/images/download/invitationsAppLogoMicro.png"></td></tr>' +
      '</table>';
    var from_email = new helper.Email(req.hostemail);
    var to_email = new helper.Email(req.guestemail);
    var subject = req.eventname;
    var content = new helper.Content("text/html", stringTemplate);
    var mail = new helper.Mail(from_email, subject, to_email, content);
    var sendgridKey = SENDGRID_API_KEY;
    var sg = require('sendgrid')(sendgridKey);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });
    sg.API(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    })
  };
  Guest.remoteMethod(
    'sendEmail', {
      accepts: {
        arg: 'req',
        type: 'object',
        'http': {
          source: 'body'
        }
      },
      returns: {
        arg: 'status',
        type: 'string'
      }
    }
  );

  Guest.confirmation = function(id, cb) {
    Guest.findOne(
      {
        where: {id: id},
        include: {
        relation:'event',
        scope:{include:'host'}
      }}
      , function(err, guest) {
      cb(null, guest);
    });
  };
  Guest.remoteMethod('confirmation', {
    http: {
      path: '/:id/confirmation',
      verb: 'get'
    },
    accepts: {
      arg: 'id',
      type: 'string',
      required: true
    },
    returns: {
      arg: 'confirmation',
      type: 'string',
      'http': {
        source: 'body'
      }
    }
  });

  Guest.barcode = function(id, cb) {
    cb(null, id);
  };
  Guest.remoteMethod('barcode', {
    http: {
      path: '/:id/barcode',
      verb: 'get'
    },
    accepts: {
      arg: 'id',
      type: 'string',
      required: true
    },
    returns: {
      arg: 'barcode',
      type: 'string'
    }
  });

};
