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


// Milestone 3
// - Click sul contatto mostra la conversazione del contatto cliccato,
// è possibile inserire nuovi messaggi per ogni conversazione
// - Cancella messaggio: cliccando sul messaggio appare un menu a tendina
// che permette di cancellare il messaggio selezionato


$(document).ready(function(){

  // //intercetto il tasto INVIO
  // $('.testo').keypress(function(event){
  //
  //   //salvo valore dell'utente
  //   var messaggio_utente = $('.testo').val();
  //
  //   if (event.which == 13) {
  //
  //     if (messaggio_utente.length > 0) { //<-- se la lunghezza del messaggio è maggiore di 0 allora...
  //       //salvo il clear
  //       $('.testo').val('');
  //
  //       //faccio il clone del messaggio
  //       var copia_utente = $('.template .utente').clone();
  //
  //       //scrivo il messaggio nella classe .utente
  //       copia_utente.text(messaggio_utente);
  //
  //       //appendo il messaggio nella classe .message
  //       $('.message').append(copia_utente);
  //
  //
  //     }
  //     setTimeout(function(){
  //       switch (messaggio_utente) {
  //         case 'ciao':
  //           //faccio il clone del messaggio
  //           var copia_cpu = $('.template .interlocutore').clone();
  //           //scrivo il messaggio nella classe .utente
  //           copia_cpu.text('ciao');
  //           //appendo il messaggio nella classe .message
  //           $('.message').append(copia_cpu);
  //         break;
  //         case 'come stai?':
  //           //faccio il clone del messaggio
  //           var copia_cpu = $('.template .interlocutore').clone();
  //           //scrivo il messaggio nella classe .utente
  //           copia_cpu.text('bene tu?');
  //           //appendo il messaggio nella classe .message
  //           $('.message').append(copia_cpu);
  //         break;
  //         case 'bene':
  //           //faccio il clone del messaggio
  //           var copia_cpu = $('.template .interlocutore').clone();
  //           //scrivo il messaggio nella classe .utente
  //           copia_cpu.text('ok');
  //           //appendo il messaggio nella classe .message
  //           $('.message').append(copia_cpu);
  //         break;
  //         default:
  //         //faccio il clone del messaggio
  //         var copia_cpu = $('.template .interlocutore').clone();
  //         //scrivo il messaggio nella classe .utente
  //         copia_cpu.text('ok');
  //         //appendo il messaggio nella classe .message
  //         $('.message').append(copia_cpu);
  //
  //       }
  //     }, 1000);
  //   }
  // });

  // //RICERCA CONTATTI
  // $('#search').keyup(function(){
  //
  //   var name_search = $(this).val().toLowerCase();
  //
  //   console.log(name_search);
  //
  //   $('.contact').each(function(){
  //
  //     var name = $(this).find('.contact__name').text().toLowerCase();
  //
  //     console.log(name);
  //
  //     if (name.includes(name_search)) {
  //       $(this).show();
  //     }else{
  //       $(this).hide();
  //     }
  //   });
  // });

  //AL CLICK DEL CONTATTO AGGIORNO
  $('.contact').click(function(){

    var nome = $(this).text();
    // var img = $(this).children($('img')).clone();
    console.log(nome);
    // console.log(img);

    $('.info__contact__left h4').text(nome);
    // $('.info__contact__left img').html(img);


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
          var dropdown = $('.dropdown__menu').clone();

          //scrivo il messaggio nella classe .utente
          copia_utente.html(messaggio_utente + '<i class="fas fa-check dropdown"></i>');

          //appendo il messaggio nella classe .message
          $('.message').append(copia_utente);
          $('.utente').append(dropdown);




          $('#modifica').click(function(){
            $('.testo').val(messaggio_utente);
            $('.dropdown__menu').toggleClass('active');


          });



          $('#delete').click(function(){

            // copia_utente.empty().text('messaggio cancellato');
            copia_utente.hide();



          });



          $('.dropdown').click(function(){

            $('.dropdown__menu').toggleClass('active');



          });



        }

      }

    });





  });








});
