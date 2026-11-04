from pathlib import Path
import base64,json,mimetypes,re
root=Path(__file__).resolve().parents[1]/'public'
html=(root/'index.html').read_text()
css=(root/'style.css').read_text()
js=(root/'projects.js').read_text()
paths=set(re.findall(r'(?:src|href)="([^"#]+\.(?:png|jpg|jpeg))"',html))
paths.update(f'projects/led-{board}-{side}.png' for board in ('driver','carrier') for side in ('front','back'))
assets={p:'data:'+mimetypes.guess_type(p)[0]+';base64,'+base64.b64encode((root/p).read_bytes()).decode() for p in paths}
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+css+'</style>')
# Embed each asset once; initialize image and preview links from the asset map.
html=re.sub(r'src="([^"#]+\.(?:png|jpg|jpeg))"',r'data-embedded-src="\1"',html)
js=js.replace('const path = `projects/led-${board}-${side}.png`;','const path = embeddedImages[`projects/led-${board}-${side}.png`];')
init='const embeddedImages = '+json.dumps(assets)+';\n'+'''document.querySelectorAll('[data-embedded-src]').forEach(image => { image.src = embeddedImages[image.dataset.embeddedSrc]; });
document.querySelectorAll('.project-image, .build-photo').forEach(link => { link.href = embeddedImages[link.getAttribute('href')]; });
'''
html=html.replace('<script src="projects.js"></script>','<script>'+init+js+'</script>')
output=root.parent/'Board-and-Bytes.html'
output.write_text(html)
print(f'Built {output.name} with {len(assets)} embedded images.')
