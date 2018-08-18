"use strict";

$(() => {
  let socket = io.connect();
  socket.on("server_to_client", data => {
    let li = $('<li>').text(data.value);
    $('#comments').append(li);
  });

  $('#text-to-send').keypress(e => {
    if (e.key !== 'Enter') return;

    let text = $("#text-to-send").val();
    if (text.length > 0) {
      $("#text-to-send").val('');
      socket.emit("client_to_server", {value : text});
      console.info("sent: " + text);
    }
  });
});