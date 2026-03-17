import fs from 'fs';
import https from 'https';

const fetchUrl = (url) => new Promise((resolve, reject) => {
  console.log('Fetching:', url);
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
    let data = '';
    
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log('Following redirect to:', res.headers.location);
      resolve(fetchUrl(res.headers.location.startsWith('http') ? res.headers.location : `https://en.wikipedia.org${res.headers.location}`));
      return;
    }

    res.on('data', c => data += c);
    res.on('end', () => resolve(data));
  }).on('error', reject);
});

async function main() {
  try {
    // a16z page
    let html = await fetchUrl('https://en.wikipedia.org/wiki/Andreessen_Horowitz');
    let m = html.match(/<img[^>]+src="(\/\/upload\.wikimedia\.org\/wikipedia\/commons\/[^"]+\.svg)"/i);
    if (m) {
      const svgUrl = 'https:' + m[1];
      console.log('Found a16z SVG:', svgUrl);
      const svg = await fetchUrl(svgUrl);
      fs.writeFileSync('a16z.svg', svg);
    } else {
      console.log('a16z SVG not found on Wikipedia');
    }

    // Info Edge page
    html = await fetchUrl('https://en.wikipedia.org/wiki/Info_Edge');
    m = html.match(/<img[^>]+src="(\/\/upload\.wikimedia\.org\/wikipedia\/(?:en|commons)\/[^"]+\.svg)"/i);
    if (!m) m = html.match(/<img[^>]+src="(\/\/upload\.wikimedia\.org\/wikipedia\/(?:en|commons)\/[^"]+)"[^>]+class="infobox-image/i);
    if (m) {
      const url = 'https:' + m[1];
      console.log('Found Info Edge Logo:', url);
      // Wait, is it SVG?
      if (url.endsWith('.svg')) {
         const svg = await fetchUrl(url);
         fs.writeFileSync('infoedge.svg', svg);
      } else {
         console.log('Info Edge logo is not SVG on Wikipedia, using text substitute');
      }
    } else {
      console.log('Info Edge logo not found');
    }
  } catch (e) {
    console.error(e);
  }
}

main();
