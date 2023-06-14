<?php
if( !empty($_POST) ) {
        $message = 
        "Новое сообщение от пользователя " . $_POST['name'] . 
        "\n" ."Отправитель: " . $_POST['name'] . 
        "\n" . "E-mail: " . $_POST['email'] . 
        "\n" . "Телефон: 
        \n " . $_POST['phone'];

        $sendMail = mail( "designer.web.studio.rgb@gmail.com", "Новое сообщение", $message );
        if( $sendMail ) {
            echo "Письмо успешно отправлено!";
			echo "<br /><br /><a href='/'>Вернуться на сайт.</a>";
        } else {
            echo "Упс ... кажется что-то пошло не так";
        }
    }
?>
<script language="JavaScript" type="text/javascript">
function changeurl(){eval(self.location="/");}
window.setTimeout("changeurl();",3000);
</script>