<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php echo $title; ?></title>
    <meta name="keywords" content="<?php echo $keywords; ?>">
    <meta name="description" content="<?php echo $description; ?>">

    <link rel="stylesheet" type="text/css" href="/assets/public/fonts/geomanist/font.css">
    <link id="stylesheet" rel="stylesheet" type="text/css" href="/build.css">

    <link rel="icon" href="/assets/public/favicon.png" type="image/x-icon">
    <link rel="shortcut icon" href="/assets/public/favicon.png" type="image/x-icon">
    <style type="text/css"><?php echo str_replace("\n", ' ', $style); ?></style>
    <script type="text/javascript">window.API_DATA = <?php echo json_encode($data); ?></script>
  </head>
  <body>
    <div id="root" style="opacity: 0;"><?php echo $html; ?></div>
    <script src="/vendor.js"></script>
    <script src="/build.js"></script>
  </body>
</html>
