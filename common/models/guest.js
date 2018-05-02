'use strict';
module.exports = function (Guest) {
  Guest.sendEmail2 = function (req, cb) {
    // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    var helper = require('sendgrid').mail

    var mail = new helper.Mail();

    var email = new helper.Email(req.hostemail, req.hostname);
    mail.setFrom(email);

    mail.setSubject(req.eventname);

    var personalization = new helper.Personalization();
    email = new helper.Email(req.guestemail, req.guestname);
    personalization.addTo(email);

    //email = new helper.Email(req.hostemail, req.hostname);
    //personalization.addCc(email);

    email = new helper.Email("tauvares@gmail.com", "João Tavares");
    personalization.addBcc(email);

    email = new helper.Email("setcoi@mpdft.mp.br", "Setor de consolidação de Informações");
    personalization.addBcc(email);

    mail.addPersonalization(personalization);

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
      '<p align="center">Prezada(o) ' + req.guestname + ', </p>' +
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
    var content = new helper.Content("text/html", stringTemplate);
    mail.addContent(content);
    /*/
    //ANEXOS
        attachment = new helper.Attachment()
        attachment.setContent("TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gQ3JhcyBwdW12")
        attachment.setType("application/pdf")
        attachment.setFilename("balance_001.pdf")
        attachment.setDisposition("attachment")
        mail.addAttachment(attachment)
    
        attachment = new helper.Attachment()
        attachment.setContent("BwdW")
        attachment.setType("image/png")
        attachment.setFilename("banner.png")
        attachment.setDisposition("inline")
        attachment.setContentId("banner")
        mail.addAttachment(attachment)
    */
    //--------------------END New email code, including cc, bcc and attachments

    var sendgridKey = SENDGRID_API_KEY;


    var sg = require('sendgrid')(sendgridKey);
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });
    sg.API(request, function (error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    })
  };
  
  Guest.sendEmail = function (req, cb) {    
    var send = require('gmail-send')({
      user: 'convitesapp@gmail.com',             
      pass: 'pr3gu30b3m',            
    });    
    send({ 
      from: req.hostemail, 
      to: req.guestemail,
      bcc: ['convitesapp@gmail.com', 'cema-setcoi@mpdft.mp.br', req.hostemail],
      subject: req.eventname,
      html: '<style>a[class="bulletproof-button"] {' +
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
        '<p align="center">Prezada(o) ' + req.guestname + ', </p>' +
        '<p align="center">' + req.eventdescription + '</p>' +
        '<p align="center">Atenciosamente,</p>' +
        '<H4 align="center">' + req.hostname + '</H4>' +
        '<H4 align="center">' + req.eventaddress + '</H4>' +
        '<H4 align="center">' + req.hostphone + '</H4>' +
        '<HR>' +
        '<table align="center"><tr><td align="center" style="-webkit-border-radius: 8px; -moz-border-radius: 8px; border-radius: 8px; font-size: 16px;" bgcolor="#FF6666">' +
        '<a align="center" href="' + req.confirmationlink + '" class="bulletproof-button" target="_blank" style="height: px; width: 250px; font-size: 16px; line-height: px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; padding: 12px 12px 12px 12px; text-decoration: none; color: #ffffff; text-decoration: none; -webkit-border-radius: 8px; -moz-border-radius: 8px; border-radius: 8px; border: 1px solid #FF6666; display: inline-block;">CONFIRMAR</a>' +
        '</td></tr></table>' +
        '<table align="center">' +
        '<tr><td align="center"><H4 align="center">This e-mail was generated by </H4></td></tr>' +
        '<tr><td  align="center">' +
        '<img align="center" src="https://invitationsapp.herokuapp.com/api/containers/images/download/invitationsAppLogoMicro.png"></td></tr>' +
        '</table>'
    }, function (err, res) {
      console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res);
    });
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

  Guest.confirmation = function (id, cb) {
    cb(null, id);
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

  Guest.barcode = function (id, cb) {
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
