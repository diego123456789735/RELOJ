<?php
function horaEspejo($hora)
{

    $partes = explode(":", $hora);
    if (count($partes) != 2) {
        return "ERROR: Formato inválido";
    }

    $h = (int)$partes[0];
    $m = (int)$partes[1];

    if ($h < 0 || $h > 12 || $m < 0 || $m > 59) {
        return "ERROR: Hora inválida";
    }

    if ($h == 0 && $m == 0) {
        $h = 12;
    }

    $minReal = (60 - $m) % 60;

    if ($m == 0) {
        $horaReal = (12 - $h) % 12;
    } else {
        $horaReal = (12 - $h - 1) % 12;
    }

    if ($horaReal <= 0) {
        $horaReal += 12;
    }

    return str_pad($horaReal, 2, "0", STR_PAD_LEFT) . ":" .
        str_pad($minReal, 2, "0", STR_PAD_LEFT);
}

$horaIngresada = "";
$resultado = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $horaIngresada = $_POST["hora"] ?? "";

    if ($horaIngresada != "") {
        $resultado = horaEspejo($horaIngresada);
    }
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Reloj en el Espejo</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="container">
        <h1>Reloj en el Espejo</h1>

        <p class="instruccion">Ingresa la hora que ves en el espejo (HH:MM)</p>

        <form method="POST">
            <div class="input-group">
                <label>Hora:</label>
                <input type="text" name="hora" maxlength="5" value="<?php echo htmlspecialchars($horaIngresada); ?>"
                    required>
            </div>

            <button type="submit">Calcular</button>
        </form>

        <?php if ($resultado != ""): ?>
        <div class="resultado">

            <div class="hora-espejo-label">Hora en el espejo</div>
            <div class="hora-espejo-valor"><?php echo htmlspecialchars($horaIngresada); ?></div>

            <div class="hora-real-label">Hora real</div>

            <?php if (strpos($resultado, "ERROR") !== false): ?>
            <div class="error"><?php echo $resultado; ?></div>
            <?php else: ?>
            <div class="hora-real-valor"><?php echo $resultado; ?></div>
            <?php endif; ?>

        </div>
        <?php endif; ?>

    </div>

</body>

</html>