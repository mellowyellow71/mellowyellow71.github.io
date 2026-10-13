<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#eaf1ff">
  <meta name="description" content="Revant Kasichainula: controls, optimization, robotics, and mathematical art.">
  <title>%($pageTitle%) · Revant Kasichainula</title>
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/site.css">
% if(! ~ $#canonical_path 0) {
  <link rel="canonical" href="%($canonical_path%)">
  <meta http-equiv="refresh" content="0;url=%($canonical_path%)">
% }
% if(~ $req_path /fun/fftwall/) {
  <script type="module" src="/assets/playground.js"></script>
% }
% if(~ $req_path /fun/rustcube/) {
  <script type="module" src="/assets/rustcube.js"></script>
% }
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <div class="site-shell">
