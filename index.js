const redis = require('redis');

const redisIP = '127.0.0.1';
const client = redis.createClient({
  host: redisIP,
  port: 6379
});

client.on('connect', () => {
  console.log('Conectado ao Redis!');
});

client.on('error', (err) => {
  console.error('Erro ao conectar ao Redis:', err);
});

async function addBoyBands() {
  try {
    
    await client.connect();

    await client.set('boyband:1', 'Backstreet Boys');
    await client.set('boyband:2', 'NSYNC');
    await client.set('boyband:3', 'One Direction');

    console.log('Boybands adicionadas com sucesso!');

    await client.hSet('boyband:1:members', {
      Nick: 'Carter',
      AJ: 'McLean',
      Howie: 'Dorough',
      Brian: 'Littrell',
      Kevin: 'Richardson'
    });

    console.log('Membros da Backstreet Boys adicionados!');

    await client.lPush('boyband:2:songs', 'Bye Bye Bye', "It's Gonna Be Me", 'Tearin’ Up My Heart');

    console.log('Músicas da NSYNC adicionadas!');

    await client.set('boyband:3:concert_tickets', 1000);
    await client.expire('boyband:3:concert_tickets', 60);

    console.log('Ingressos da One Direction adicionados com expiração de 60 segundos!');

    await client.quit();
  } catch (err) {
    console.error('Erro ao adicionar boybands:', err);
  }
}
addBoyBands();
