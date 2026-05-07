const https = require('https');
const id = 'com.bidz.bidz';
https.get('https://play.google.com/store/apps/details?id=' + id + '&hl=en_IN', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        const matches = [...data.matchAll(/srcset="([^ \"]+)[^"]+"/gi)];
        let urls = [];
        matches.forEach(m => urls.push(m[1].split('=')[0] + '=w1024'));
        console.log("BIDZ screenshots:")
        console.log([...new Set(urls)].slice(0,4));
    });
});
