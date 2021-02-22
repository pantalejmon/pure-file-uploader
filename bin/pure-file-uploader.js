const app = require("../dist/main");
const minimist = require('minimist');
const colors = require('colors/safe');
const packageInfo = require('./../package.json');
const argv = minimist(process.argv.slice(2));

console.log([
    'pure-file-uploader:',
    '  PPL 2021',
    '',
    '',
    `version: ${packageInfo.version} `,
    '',
].join('\n'));

if (argv.h || argv.help) {
    console.log([
        'usage: pure-file-uploader [path] [options]',
        '',
        'options:',
        '  -p --port    Port to use [8080]',
        '  -V --version Version Info',
        '  -a           Address to use [0.0.0.0]',
        '  -s --silent  Suppress log messages from output',
        '',
        '  -S --ssl     Enable https.',
        '  -C --cert    Path to ssl cert file (default: cert.pem).',
        '  -K --key     Path to ssl key file (default: key.pem).',
        '',
        '  -h --help    Print this list and exit.'
    ].join('\n'));
    process.exit();
}

if (!!argv.V || !!argv.version) {
    console.log([
        'usage: files-upload-server [path] [options]',
    ].join('\n'));
    process.exit();
}

let port = argv.p || argv.port || parseInt(process.env.PORT, 10);

app.bootstrap(port)

if (process.platform === 'win32') {
    require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    }).on('SIGINT', function () {
        process.emit('SIGINT');
    });
}

process.on('SIGINT', function () {
    console.info(colors.red('http-server stopped.'));
    process.exit();
});

process.on('SIGTERM', function () {
    console.info(colors.red('http-server stopped.'));
    process.exit();
});
