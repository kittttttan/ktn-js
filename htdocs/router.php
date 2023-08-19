<?php

$path = pathinfo($_SERVER['SCRIPT_FILENAME']);
switch ($path['extension']) {
    case 'mjs':
        header('Content-Type: text/javascript');
        readfile($_SERVER['SCRIPT_FILENAME']);
        break;
    case 'wasm':
        header('Content-Type: application/wasm');
        readfile($_SERVER['SCRIPT_FILENAME']);
        break;
    default:
        return false;
}
