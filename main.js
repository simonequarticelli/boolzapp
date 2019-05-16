// Milestone 1
// Replica della grafica con la possibilità di avere messaggi
// scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
// Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando
// invia il testo viene aggiunto al thread sopra, come messaggio verde

// Milestone 2
// - Risposta dall’interlocutore: ad ogni inserimento di un messaggio,
// l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
// - Ricerca utenti: scrivendo qualcosa nell’input a sinistra,
// vengono visualizzati solo i contatti il cui nome contiene le lettere inserite
// (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

$(document).ready(function(){

  //intercetto il tasto INVIO
  $('.testo').keypress(function(event){

    //salvo valore dell'utente
    var messaggio_utente = $('.testo').val();

    if (event.which == 13) {

      if (messaggio_utente.length > 0) { //<-- se la lunghezza del messaggio è maggiore di 0 allora...
        //salvo il clear
        $('.testo').val('');

        //faccio il clone del messaggio
        var copia_utente = $('.template .utente').clone();

        //scrivo il messaggio nella classe .utente
        copia_utente.text(messaggio_utente);

        //appendo il messaggio nella classe .message
        $('.message').append(copia_utente);


      }
      setTimeout(function(){
        switch (messaggio_utente) {
          case 'ciao':
            //faccio il clone del messaggio
            var copia_cpu = $('.template .interlocutore').clone();
            //scrivo il messaggio nella classe .utente
            copia_cpu.text('ciao');
            //appendo il messaggio nella classe .message
            $('.message').append(copia_cpu);
          break;
          case 'come stai?':
            //faccio il clone del messaggio
            var copia_cpu = $('.template .interlocutore').clone();
            //scrivo il messaggio nella classe .utente
            copia_cpu.text('bene tu?');
            //appendo il messaggio nella classe .message
            $('.message').append(copia_cpu);
          break;
          case 'bene':
            //faccio il clone del messaggio
            var copia_cpu = $('.template .interlocutore').clone();
            //scrivo il messaggio nella classe .utente
            copia_cpu.text('ok');
            //appendo il messaggio nella classe .message
            $('.message').append(copia_cpu);
          break;
          default:
          //faccio il clone del messaggio
          var copia_cpu = $('.template .interlocutore').clone();
          //scrivo il messaggio nella classe .utente
          copia_cpu.text('ok');
          //appendo il messaggio nella classe .message
          $('.message').append(copia_cpu);

        }
      }, 1000);
    }
  });

  $('#search').keyup(function(){
    var name_seacrh = $('#search').val();
    console.log(name_seacrh);

    $('.contact').show();

    $('.contact').each(function(){

      if ($(this).text().toLowerCase() != name_seacrh.toLowerCase()) {
        $(this).hide();
      }
    })
  });




});
