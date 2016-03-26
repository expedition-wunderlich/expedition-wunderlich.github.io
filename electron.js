// Searches for global node modules on Windows
if (process.env.APPDATA) {
	require('module').globalPaths.push(process.env.APPDATA + '\\npm\\node_modules');
}

const NODE_ENV = process.env.NODE_ENV || 'development';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const express = require('express');
const PORT = 4000;
const server = express();

// Report crashes to our server.
// electron.crashReporter.start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform != 'darwin') {
		app.quit();
	}
});

if (NODE_ENV === 'development') {
	server.use('/assets', express.static(__dirname + '/assets'));
	server.use(express.static(__dirname + '/build'));
}
else {
	server.use(express.static(__dirname));
}

server.listen(PORT, () => {
	console.log(`Serving project on port ${PORT}.`);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		icon: './assets/icon.png',
		width: 800,
		height: 600,
		kiosk: true,
		frame: false,
		'node-integration': false
	});

	// and load the index.html of the app.
	mainWindow.loadURL(`http://localhost:${PORT}/index.html`);

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
});