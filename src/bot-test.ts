import puppeteer from 'puppeteer-core';

export async function runBot() {
  const browser = await puppeteer.launch({
    headless: false, // pon en true para que no se vea el navegador
    executablePath: '/usr/bin/google-chrome', // Cambiar ruta en donde tengas instalado tu navegador
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();

  // Detectar cuando se abre una nueva ventana/pestaña
  browser.on('targetcreated', async (target) => {
    if (target.type() === 'page') {
      const newPage = await target.page();
      if (newPage) {
        console.log('Nueva ventana abierta, cerrándola...');
        await newPage.close();
      }
    }
  });

  // poner aqui la url del video
  await page.goto('https://www3.animeflv.net/', { waitUntil: 'networkidle2' });


  console.log('Página principal abierta y lista.');

  // Esperar 15 segundos 
  // await new Promise(resolve => setTimeout(resolve, 15000));

  // Esto es pa cerrar el navegador
  // await browser.close();
}

runBot().catch(console.error);
