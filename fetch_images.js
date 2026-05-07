const https = require('https');
const urls = [
    'https://play.google.com/store/apps/details?id=com.bidz.bidz&hl=en_IN',
    'https://play.google.com/store/apps/details?id=com.roommates.room&hl=en_IN',
    'https://play.google.com/store/search?q=OpenStatus&c=apps&hl=en_IN'
];

urls.forEach(url => {
    https.get(url, res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const og = data.match(/<meta property="og:image" content="(.*?)"/);
            const img = data.match(/<img[^>]+src="([^"]+)"[^>]+alt="Icon image"/);
            console.log(url);
            console.log("IMG:", og ? og[1] : (img ? img[1] : 'not found'));
            console.log("---");
        });
    });
});
