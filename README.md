-Pon la URL del anime que tu quieras en este cacho del codigo await page.goto('https://www3.animeflv.net/', { waitUntil: 'networkidle2' });

-Cambiar ruta en donde tengas instalado tu chronium executablePath: '/usr/bin/google-chrome'

-Comando instalar chronium: LINUX sudo apt update && sudo apt install -y chromium-browser. WINDOWS choco install chromium -y

-Instalar dotenv: npm install dotenv.

-Introducir esto en el archivo .env en caso de no tenerlo crearlo: 

# URL de la página a visitar
TARGET_URL=https://www3.animeflv.net/

# Tamaño del viewport del navegador
VIEWPORT_WIDTH=1920
VIEWPORT_HEIGHT=1080

# Credenciales para login (En caso de no tener cuenta dejalo vacio)
LOGIN_EMAIL=tu_gmail_de_animeflv
LOGIN_PASSWORD=tu_contraseña

-Comando ejecutar programa: ts-node src/bot-test.ts
