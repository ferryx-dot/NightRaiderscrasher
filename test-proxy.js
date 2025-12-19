const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { HttpsProxyAgent } = require('https-proxy-agent');

console.log(`
╔═══════════════════════════════════════════╗
║  🔒 NIGHT RAIDERS PROXY TESTER 🔒
╚═══════════════════════════════════════════╝
`);

async function testProxy(proxyString, index) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve({ proxy: proxyString, index, success: false, error: 'Timeout' });
    }, 10000);

    try {
      const [host, port] = proxyString.split(':');
      const proxyUrl = `http://${host}:${port}`;
      const agent = new HttpsProxyAgent(proxyUrl);

      const req = https.get('https://api.ipify.org?format=json', { agent }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          clearTimeout(timeout);
          try {
            const json = JSON.parse(data);
            resolve({ 
              proxy: proxyString, 
              index, 
              success: true, 
              externalIp: json.ip 
            });
          } catch (e) {
            resolve({ proxy: proxyString, index, success: true, externalIp: data.trim() });
          }
        });
      });

      req.on('error', (err) => {
        clearTimeout(timeout);
        resolve({ proxy: proxyString, index, success: false, error: err.message });
      });

      req.end();
    } catch (err) {
      clearTimeout(timeout);
      resolve({ proxy: proxyString, index, success: false, error: err.message });
    }
  });
}

async function main() {
  const proxyPath = path.join(__dirname, 'proxy.txt');
  
  if (!fs.existsSync(proxyPath)) {
    console.log('❌ proxy.txt not found!');
    process.exit(1);
  }

  const content = fs.readFileSync(proxyPath, 'utf-8');
  const proxies = content.split('\n')
    .filter(line => line.trim())
    .filter(line => /^[\d.]+:\d+$/.test(line.trim()))
    .slice(0, 10);

  console.log(`📊 Testing first ${proxies.length} proxies...\n`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const results = await Promise.all(
    proxies.map((proxy, index) => testProxy(proxy.trim(), index + 1))
  );

  let working = 0;
  let failed = 0;

  for (const result of results) {
    if (result.success) {
      console.log(`✅ Proxy #${result.index}: ${result.proxy}`);
      console.log(`   External IP: ${result.externalIp}`);
      working++;
    } else {
      console.log(`❌ Proxy #${result.index}: ${result.proxy}`);
      console.log(`   Error: ${result.error}`);
      failed++;
    }
    console.log('');
  }

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`
╔═══════════════════════════════════════════╗
║  📊 RESULTS SUMMARY
╚═══════════════════════════════════════════╝

✅ Working: ${working}/${proxies.length}
❌ Failed: ${failed}/${proxies.length}
📈 Success Rate: ${Math.round((working / proxies.length) * 100)}%

👿 "The proxies are ready for battle" ☠️
`);
}

main().catch(console.error);
