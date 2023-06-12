<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];

  // Виконати логіку для надсилання листа на електронну пошту
  $to = "innavohnysta@gmail.com";
  $subject = "Нова форма зворотного зв'язку";
  $message = "Ім'я: $name\n";
  $message .= "Електронна пошта: $email\n";
  $message .= "Телефон: $phone\n";
  $headers = "From: $email";

  if (mail($to, $subject, $message, $headers)) {
    http_response_code(200);
  } else {
    http_response_code(500);
  }
}
?>
