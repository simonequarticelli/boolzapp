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

  //creo funzione di scroll visto il ripetuto utilizzo
  function scrollTop(){
    //vado a leggare l'altezza del contenitore della chat tramite js-plain
    var scroll = $('.message.active')[0].scrollHeight;
    //assegno l'altezza dello scroll al matodo jquery .scrollTop
    $('.message.active').scrollTop(scroll);
  }

  scrollTop();

  function time(){
    var ora = new Date;
    //console.log(ora);
    var ore = ora.getHours();
    //console.log(ore);
    var minuti = ora.getMinutes();
    //console.log(minuti);
    if (minuti < 10) {
      minuti = '0' + minuti;
    }
    if (ora < 10) {
      ora = '0' + ora;
    }
    var ora_messaggi = ore + ':' + minuti;
    //console.log(ora_messaggi);

    return ora_messaggi;
  }

  time();

  $('.ora').text(time());

  $('.info__contact__left').find('span').text(time());

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

    //associo contatti e conversazioni
    var contatto = $(this).attr('data-contatto');
    //console.log(contatto);
    var conversazione_contatto = $('.message[data-conversazione="'+contatto+'"]');
    //console.log(conversazione_contatto);
    $('.message').removeClass('active');
    conversazione_contatto.addClass('active');

    scrollTop();

  });

  $('#plane').click(function(){

    //salvo valore dell'utente
    var messaggio_utente = $('.testo').val();

    if (messaggio_utente.length > 0) { //<-- se la lunghezza del messaggio è maggiore di 0 allora...
      //salvo il clear
      $('.testo').val('');

      time();

      //faccio il clone del messaggio
      var copia_utente = $('.template .utente').clone();

      //scrivo il messaggio nella classe .utente
      copia_utente.children('.text_utente').text(messaggio_utente);

      //scrivo l'ora corrente nel messaggio_utente
      copia_utente.children('.ora').text(time());

      //appendo il messaggio nella classe .message
      $('.message.active').append(copia_utente);

      //dopo un secondo cambio il colore dell'icona
      setTimeout(function(){
        //vado a prendere nel contenitore con
        //la classe active l'ultimo messaggio e applico il css
        $('.message.active').last('.utente').find('.doppia_spunta').css('color', '#74b9ff');
      }, 2000);

      scrollTop();

      setTimeout(function(){
        switch (messaggio_utente) {
          case 'ciao':
            //faccio il clone del messaggio
            var copia_cpu = $('.template .interlocutore').clone();
            //scrivo il messaggio nella classe .utente
            copia_cpu.children('.text_interlocutore').text('ciao');
            //scrivo l'ora corrente nel messaggio_cpu
            copia_cpu.children('.ora_cpu').text(time());
            //appendo il messaggio nella classe .message
            $('.message.active').append(copia_cpu);
            scrollTop();
          break;
          case 'come stai?':
            //faccio il clone del messaggio
            var copia_cpu = $('.template .interlocutore').clone();
            //scrivo il messaggio nella classe .utente
            copia_cpu.children('.text_interlocutore').text('bene tu?');
            //appendo il messaggio nella classe .message
            $('.message.active').append(copia_cpu);
            //scrivo l'ora corrente nel messaggio_cpu
            copia_cpu.children('.ora_cpu').text(time());
            scrollTop();
          break;
          case 'bene':
            //faccio il clone del messaggio
            var copia_cpu = $('.template .interlocutore').clone();
            //scrivo il messaggio nella classe .utente
            copia_cpu.children('.text_interlocutore').text('ok');
            //appendo il messaggio nella classe .message
            $('.message.active').append(copia_cpu);
            //scrivo l'ora corrente nel messaggio_cpu
            copia_cpu.children('.ora_cpu').text(time());
            scrollTop();
          break;
          default:

          //faccio il clone del messaggio
          var copia_cpu = $('.template .interlocutore').clone();
          //scrivo il messaggio nella classe .utente
          copia_cpu.children('.text_interlocutore').text('ok');
          //appendo il messaggio nella classe .message
          $('.message.active').append(copia_cpu);
          //scrivo l'ora corrente nel messaggio_cpu
          copia_cpu.children('.ora_cpu').text(time());
          scrollTop();
          //AGGIUNGO EFFETTI MESSAGGI UTENTE
          $('.utente').mouseenter(function(){
            $(this).find('.fa-angle-down').fadeIn(200);
            $(this).find('.doppia_spunta').hide();
            $(this).find('.ora').hide();
          });

          $('.utente').mouseleave(function(){
            $(this).find('.fa-angle-down').hide();
            $(this).find('.doppia_spunta').fadeIn(200);
            $(this).find('.ora').fadeIn(200);
          });

          //AGGIUNGO EFFETTI MESSAGGI CPU
          $('.interlocutore').mouseenter(function(){
            $(this).find('.fa-angle-down').fadeIn(200);
            $(this).find('.ora_cpu').hide();
          });

          $('.interlocutore').mouseleave(function(){
            $(this).find('.fa-angle-down').hide();
            $(this).find('.ora_cpu').fadeIn(200);
          });
        }
      }, 1000);
    }
  });

  //intercetto il tasto INVIO
  $('.testo').keypress(function(event){

    //salvo valore dell'utente
    var messaggio_utente = $('.testo').val();

    $('#plane').show(200);
    $('#mic').hide(200);

    if (event.which == 13) {

      if (messaggio_utente.length > 0) { //<-- se la lunghezza del messaggio è maggiore di 0 allora...
        //salvo il clear
        $('.testo').val('');

        time();

        //faccio il clone del messaggio
        var copia_utente = $('.template .utente').clone();

        //scrivo il messaggio nella classe .utente
        copia_utente.children('.text_utente').text(messaggio_utente);

        //scrivo l'ora corrente nel messaggio_utente
        copia_utente.children('.ora').text(time());

        //appendo il messaggio nella classe .message
        $('.message.active').append(copia_utente);

        //dopo un secondo cambio il colore dell'icona
        setTimeout(function(){
          //vado a prendere nel contenitore con
          //la classe active l'ultimo messaggio e applico il css
          $('.message.active').last('.utente').find('.doppia_spunta').css('color', '#74b9ff');
        }, 2000);

        scrollTop();

        $('#plane').hide(200);
        $('#mic').show(200);

        setTimeout(function(){
          switch (messaggio_utente) {
            case 'ciao':
              //faccio il clone del messaggio
              var copia_cpu = $('.template .interlocutore').clone();
              //scrivo il messaggio nella classe .utente
              copia_cpu.children('.text_interlocutore').text('ciao');
              //scrivo l'ora corrente nel messaggio_cpu
              copia_cpu.children('.ora_cpu').text(time());
              //appendo il messaggio nella classe .message
              $('.message.active').append(copia_cpu);
              scrollTop();
            break;
            case 'come stai?':
              //faccio il clone del messaggio
              var copia_cpu = $('.template .interlocutore').clone();
              //scrivo il messaggio nella classe .utente
              copia_cpu.children('.text_interlocutore').text('bene tu?');
              //appendo il messaggio nella classe .message
              $('.message.active').append(copia_cpu);
              //scrivo l'ora corrente nel messaggio_cpu
              copia_cpu.children('.ora_cpu').text(time());
              scrollTop();
            break;
            case 'bene':
              //faccio il clone del messaggio
              var copia_cpu = $('.template .interlocutore').clone();
              //scrivo il messaggio nella classe .utente
              copia_cpu.children('.text_interlocutore').text('ok');
              //appendo il messaggio nella classe .message
              $('.message.active').append(copia_cpu);
              //scrivo l'ora corrente nel messaggio_cpu
              copia_cpu.children('.ora_cpu').text(time());
              scrollTop();
            break;
            default:

            //faccio il clone del messaggio
            var copia_cpu = $('.template .interlocutore').clone();
            //scrivo il messaggio nella classe .utente
            copia_cpu.children('.text_interlocutore').text('ok');
            //appendo il messaggio nella classe .message
            $('.message.active').append(copia_cpu);
            //scrivo l'ora corrente nel messaggio_cpu
            copia_cpu.children('.ora_cpu').text(time());
            scrollTop();
            //AGGIUNGO EFFETTI MESSAGGI UTENTE
            $('.utente').mouseenter(function(){
              $(this).find('.fa-angle-down').fadeIn(200);
              $(this).find('.doppia_spunta').hide();
              $(this).find('.ora').hide();
            });

            $('.utente').mouseleave(function(){
              $(this).find('.fa-angle-down').hide();
              $(this).find('.doppia_spunta').fadeIn(200);
              $(this).find('.ora').fadeIn(200);
            });

            //AGGIUNGO EFFETTI MESSAGGI CPU
            $('.interlocutore').mouseenter(function(){
              $(this).find('.fa-angle-down').fadeIn(200);
              $(this).find('.ora_cpu').hide();
            });

            $('.interlocutore').mouseleave(function(){
              $(this).find('.fa-angle-down').hide();
              $(this).find('.ora_cpu').fadeIn(200);
            });
          }
        }, 1000);
      }
    }
  });

  //DA PERFEZIONARE  -->(NON RIESCO A SOVRASCRIVERE IL MESSAGGIO)<--

  //MODIFICARE IL MESSAGGIO
  $(document).on('click', '#modifica', function(){
  $(this).closest('.utente').find('.text_utente').text();
  console.log($(this).closest('.utente').find('.text_utente').text());
  //riassegno il testo da modificare alla barra
  $('.testo').val(messaggio_utente);

  });

  //funzione per ricare la pagina e per far apparire menu
  $(document).on('click', '.fa-angle-down', function(){
    //al click del fratello .dropdown__menu agg o togli .active
    $(this).siblings('.dropdown__menu').toggleClass('active');
  });

  //chiudo i dropdown__menu al click del contenitore attivo dei messaggi
  //(cosi facendo alterno l'apertura e la chiusura delle tendine)
  $('.message.active').click(function(){
    $('.dropdown__menu').removeClass('active');
  });

  $(document).on('click', '#delete', function(){
    //vado in cerca verso l'alto della classe da eliminare
    $(this).closest('.utente').remove();
    //elimino messaggi cpu
    $(this).closest('.interlocutore').remove();
  });

  //CAMBIO L'ICONA AL FOCUS
  $('.testo').focus(function(){

    $('#mic').hide(200); //<-- inserisco il parametro dei millisec per avere il click su #plane
    $('#plane').show(200);

  }).blur(function(){

    $('#plane').hide(200);
    $('#mic').show(200);

  });

});
