const {Builder, By, Key, until} = require('selenium-webdriver');
const readline = require("readline");


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function readConsoleLine() {
	return new Promise((okFn, errorFn) => {
		rl.prompt();
		rl.on('line', (line) => {
			okFn(line);
		}).on('close', () => {
		    console.log('Have a great day! END');
		    process.exit(0);
		});
	} );
}

function writeConsoleLine(txt) {
	console.log(txt);
}

function menu() {
	writeConsoleLine("What to do next?");
    writeConsoleLine("1-goto google");
    writeConsoleLine("2-goto sapo");
    writeConsoleLine("3-close browser");
    writeConsoleLine("4-EXIT");
}

async function openDriver()   {
    writeConsoleLine("Open browser...");	
	return await new Builder().forBrowser('firefox').build();
}



var driver;
async function doA() {
	
	driver = await openDriver();
	
	let line;
	do {
		menu();
		line = await readConsoleLine();
		
		try {
			if (line === '1') {
				writeConsoleLine("Going to google...");
            	await driver.get('http://www.google.com/ncr');
            	await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
            	await driver.wait(until.titleIs('webdriver - Pesquisa Google'), 1000);          
			}
			
			if (line === '2') {
				writeConsoleLine("Going to sapo...");
            	await driver.get('http://www.sapo.pt');
			}
			
			if (line === '3') {
				writeConsoleLine("closing browser...");
            	await driver.quit();
			}
			
		} catch (e) {
			console.log('An error has append:' + e);
		}	
	} while (line !== '4');
	
	writeConsoleLine('Thats all folks!!!');
	process.exit(0);
}

doA();
