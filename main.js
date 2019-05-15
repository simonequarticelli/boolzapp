// Milestone 1
// Replica della grafica con la possibilità di avere messaggi
// scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando
// invia il testo viene aggiunto al thread sopra, come messaggio verde


$(document).ready(function(){

  $('button').click(function(){

    var messaggio_utente = $('.testo').val();
    var clear = $('.testo').val('');

    //console.log(messaggio_utente);

    $('.utente').append(messaggio_utente);





  });













});
