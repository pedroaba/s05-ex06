if (Notification.permission !== "granted") {
  Notification.requestPermission(
    function (permission) {
      if (permission === "granted") {
        new Notification("Obrigado por entrar no site!", {
          body: "Você receberá notificações sobre erros e avisos.",
        });
      } 
    }
  );
}
