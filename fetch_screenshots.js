const https = require('https');

const fetchScreenshots = (url, name) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        let data = '';
        res.on('data', c => data += c);
        res.on('end', () => {
            let imgUrls = [];
            const matches = [...data.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/gi)];
            matches.forEach(m => {
                if (m[0].includes('Screenshot image')) {
                    // Extract base url without sizing params
                    let baseUrl = m[1].split('=')[0];
                    imgUrls.push(baseUrl + '=w1024');
                }
            });
            
            if (imgUrls.length > 0) {
                console.log(name + " SCREENSHOTS: \n" + imgUrls.slice(0, 3).join('\n'));
            } else {
                console.log(name + " NO SCREENSHOT FOUND.");
            }
        });
    });
};

fetchScreenshots('https://play.google.com/store/apps/details?id=com.bidz.bidz&hl=en_IN', 'BIDZ');
fetchScreenshots('https://play.google.com/store/apps/details?id=com.roommates.room&hl=en_IN', 'SeekRoomie');
fetchScreenshots('https://play.google.com/store/apps/details?id=com.open.chair.openchair&hl=en_IN', 'OpenChair');

https.get('https://play.google.com/store/search?q=OpenStatus&c=apps&hl=en_IN', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        const idMatch = data.match(/\/store\/apps\/details\?id=([a-zA-Z0-9._]+)/);
        if (idMatch) {
            const detailUrl = 'https://play.google.com/store/apps/details?id=' + idMatch[1] + '&hl=en_IN';
            fetchScreenshots(detailUrl, 'OpenStatus');
        } else {
            console.log('OpenStatus Detail URL not found.');
        }
    });
});
