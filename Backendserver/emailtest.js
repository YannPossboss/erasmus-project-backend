//Wir müssen ja automatisiert eine email verschicken für passwort oder verifikation der Email
//Ich wollte mal testen wie das geht

mail = require('sendmail')();
mail({
       from: 'noreply@192.168.137.1',
       to: 'opossi008@gmail.com',
       subject: 'Mail versendet mit sendmail',
       content: 'Hallo'
   },
   function(err,response){
      if(err){
         console.log(err);
      }
      console.dir(response);
});