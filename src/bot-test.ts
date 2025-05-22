import puppeteer from 'puppeteer-core';
import dotenv from 'dotenv';

dotenv.config();

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

   // Activar la interceptación de peticiones para bloquear URLs sospechosas
   await page.setRequestInterception(true);
   page.on('request', (request) => {
     const url = request.url();
     // Bloquea cualquier petición que contenga hypnotizebaseballjesus.com o playanimenow.com
     if (url.includes('hypnotizebaseballjesus.com') || url.includes('playanimenow.com')) {
       console.log('Bloqueando petición a:', url);
       request.abort();
     } else {
       request.continue();
     }
   });

  // Ajustar la pantalla al tamaño especificado en .env
  await page.setViewport({
    width: parseInt(process.env.VIEWPORT_WIDTH || '1920', 10),
    height: parseInt(process.env.VIEWPORT_HEIGHT || '1080', 10),
  });

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
  await page.goto(process.env.TARGET_URL || 'https://www3.animeflv.net/', { waitUntil: 'networkidle2' });


  console.log('Página principal abierta y lista.');

  
  const email = process.env.LOGIN_EMAIL || '';
  const password = process.env.LOGIN_PASSWORD || '';

  if (email.trim() === '' || password.trim() === '') {
    console.log('Usuario o contraseña vacíos, se omite el inicio de sesión');
  } else {

    // 1. Click en el label que abre el login (el label for="DpdwLnk-Login")
    await page.click('label[for="DpdwLnk-Login"]');
    console.log('Click en Login');

    // 2. Esperar que el formulario sea visible
    await page.waitForSelector('form[action="/auth/sign_in"] input[name="email"]', { visible: true });

    // 3. Rellenar usuario y contraseña
    await page.type('form[action="/auth/sign_in"] input[name="email"]', email, { delay: 100 });
    await page.type('form[action="/auth/sign_in"] input[name="password"]', password, { delay: 100 });
    console.log('Credenciales rellenadas');

    // 4. Click en el botón INICIAR SESIÓN para enviar el formulario
    await page.click('form[action="/auth/sign_in"] button[type="submit"]');
    console.log('Formulario enviado, iniciando sesión...');

    // Opcional: esperar navegación
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    console.log('Sesión iniciada');
  }
}

runBot().catch(console.error);
