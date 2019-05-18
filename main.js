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

  function scrollTop(){
    //vado a leggare l'altezza del contenitore della chat tramite js-plain
    var scroll = $('.message.active')[0].scrollHeight;
    //assegno l'altezza dello scroll al matodo jquery .scrollTop
    $('.message.active').scrollTop(scroll);
  }

  scrollTop();

  //RICERCA CONTATTI
  $('#search').keyup(function(){

    var name_search = $(this).val().toLowerCase();

    //console.log(name_search);

    $('.contact').each(function(){

      var name = $(this).find('.contact__name').text().toLowerCase();

      //console.log(name);

      if (name.includes(name_search)) {
        $(this).show();
      }else{
        $(this).hide();
      }
    });
  });




  //AL CLICK DEL CONTATTO AGGIORNO LE INFO
  $('.contact').click(function(){

    //tolgo il bg grey a tutti
    $('.contact').removeClass('grey');
    //lo aggiungo solo a quello che clicco
    $(this).toggleClass('grey');

    //salvo il nome del contatto
    var nome = $(this).find('.contact__name').text();
    //faccio un clone della foto (tag img)
    var img = $(this).children('img').clone();
    //vado a modificare informazioni contatto
    $('.info__contact__left h4').text(nome);
    $('.info__contact__img').html(img);

    var contatto = $(this).attr('data-contatto');
    //console.log(contatto);
    var conversazione_contatto = $('.message[data-conversazione="'+contatto+'"]');
    //console.log(conversazione_contatto);
    $('.message').removeClass('active');
    conversazione_contatto.addClass('active');

    scrollTop();


  });

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
          copia_utente.children('.text_utente').text(messaggio_utente);

          //appendo il messaggio nella classe .message
          $('.message.active').append(copia_utente);

          //creo funzione di scroll visto il ripetuto utilizzo


          scrollTop();

          //dopo un secondo cambio il colore dell'icona
          setTimeout(function(){
            $('.doppia_spunta').css('color', '#74b9ff');
          }, 2000);

          setTimeout(function(){
            switch (messaggio_utente) {
              case 'ciao':
                //faccio il clone del messaggio
                var copia_cpu = $('.template .interlocutore').clone();
                //scrivo il messaggio nella classe .utente
                copia_cpu.children('.text_interlocutore').text('ciao');
                //appendo il messaggio nella classe .message
                $('.message.active').append(copia_cpu);
                scrollTop();
              break;
              case 'come stai?':
                //faccio il clone del messaggio
                var copia_cpu = $('.template .interlocutore').clone();
                //scrivo il messaggio nella classe .utente
                copia_cpu.text('bene tu?');
                //appendo il messaggio nella classe .message
                $('.message.active').append(copia_cpu);
                scrollTop();
              break;
              case 'bene':
                //faccio il clone del messaggio
                var copia_cpu = $('.template .interlocutore').clone();
                //scrivo il messaggio nella classe .utente
                copia_cpu.text('ok');
                //appendo il messaggio nella classe .message
                $('.message.active').append(copia_cpu);
                scrollTop();
              break;
              default:
              //faccio il clone del messaggio
              var copia_cpu = $('.template .interlocutore').clone();
              //scrivo il messaggio nella classe .utente
              copia_cpu.text('ok');
              //appendo il messaggio nella classe .message
              $('.message.active').append(copia_cpu);
              scrollTop();
            }
          }, 1000);
        }



      }




      //DA PERFEZIONARE


      // //MODIFICARE IL MESSAGGIO
      // $(document).on('click', '#modifica', function(){
      //
      //   //riassegno il testo da modificare alla barra
      //   var mess = $('.testo').val(messaggio_utente);
      //
      //   //chiudo la tendina
      //   $(this).closest('.dropdown__menu').removeClass('active');
      //
      //
      // });

    //funzione per ricare la pagina e per far apparire menu
    $(document).on('click', '.doppia_spunta', function(){
      //al click del fratello .dropdown__menu agg o togli .active
      $(this).siblings('.dropdown__menu').toggleClass('active');
      //CERCARE DI IMPEDIRE L'APERTURA DELLE ALTRE TENDINE


    });

    //CAMBIO L'ICONA AL FOCUS



    $(document).on('click', '#delete', function(){
      //vado in cerca verso l'alto della classe da eliminare
      $(this).closest('.utente').remove();
    });


  });






});
