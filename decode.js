var b=require('fs').readFileSync(process.argv[1],'utf8').trim(); require('fs').writeFileSync(process.argv[2], Buffer.from(b,'base64')); console.log('ok') 
