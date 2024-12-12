function r(r,t){return null!=t&&"undefined"!=typeof Symbol&&t[Symbol.hasInstance]?!!t[Symbol.hasInstance](r):r instanceof t}import{Message as t,SystemProgram as e,Transaction as n,VersionedMessage as a,VersionedTransaction as o}from"@solana/web3.js";var u=function(r){var e=Buffer.from(r,"hex");try{var u=a.deserialize(e);return new o(u)}catch(r){var f=t.from(e);return n.populate(f)}},f=function(t){if(r(t,Buffer))return"0x"+t.readIntLE(4,8).toString(16);if(r(t,Uint8Array))return"0x"+Buffer.from(t).readIntLE(4,8).toString(16);throw Error("Unsupported data type")};export var parsingSolanaTransaction=function(t){var n,a,i,s=u(t),c="";if(r(s,o)){var d=s.message;n=d.staticAccountKeys,a=d.compiledInstructions.map(function(r){return{programId:n[r.programIdIndex],keys:r.accountKeyIndexes.map(function(r){return n[r]}),data:r.data}}),c=n[0].toBase58()}else n=(a=s.instructions.map(function(r){return{programId:r.programId,keys:r.keys.map(function(r){return r.pubkey}),data:r.data}})).map(function(r){return r.keys}).flat(),c=(null===(i=s.feePayer)||void 0===i?void 0:i.toBase58())||"";if(0===a.length)throw Error("No instructions found");if(a.length>1)return{from:c};if(a[0].programId.equals(e.programId)&&a[0].data.length>=9&&2===a[0].data[0])try{return{from:c,to:a[0].keys[1].toBase58(),value:f(a[0].data)}}catch(r){throw r}return{from:c,to:a[0].keys[1].toBase58()}};export var decodeTransaction=function(t,e){var n=Buffer.from(e,"hex");try{return o.deserialize(n)}catch(n){var a=u(t);try{if(r(a,o)){var f=a.message.staticAccountKeys;0!==a.signatures.length&&a.signatures.find(function(r){return r.toString().replace(",","")===e})||a.addSignature(f[0],Buffer.from(e,"hex"))}else a.addSignature(a.feePayer,Buffer.from(e,"hex"));return a}catch(r){throw r}}};