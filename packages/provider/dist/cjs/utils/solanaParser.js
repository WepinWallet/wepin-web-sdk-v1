"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),function(r,e){for(var t in e)Object.defineProperty(r,t,{enumerable:!0,get:e[t]})}(exports,{decodeTransaction:function(){return o},parsingSolanaTransaction:function(){return a}});var r=require("@solana/web3.js");function e(r,e){return null!=e&&"undefined"!=typeof Symbol&&e[Symbol.hasInstance]?!!e[Symbol.hasInstance](r):r instanceof e}var t=function(e){e.startsWith("0x")&&(e=e.slice(2));var t=Buffer.from(e,"hex");try{var n=r.VersionedMessage.deserialize(t);return new r.VersionedTransaction(n)}catch(e){var a=r.Message.from(t);return r.Transaction.populate(a)}},n=function(r){if(e(r,Buffer))return"0x"+r.readIntLE(4,8).toString(16);if(e(r,Uint8Array))return"0x"+Buffer.from(r).readIntLE(4,8).toString(16);throw Error("Unsupported data type")},a=function(a){var o,s,i,u=t(a),f="";if(e(u,r.VersionedTransaction)){var c=u.message;o=c.staticAccountKeys,s=c.compiledInstructions.map(function(r){return{programId:o[r.programIdIndex],keys:r.accountKeyIndexes.map(function(r){return o[r]}),data:r.data}}),f=o[0].toBase58()}else o=(s=u.instructions.map(function(r){return{programId:r.programId,keys:r.keys.map(function(r){return r.pubkey}),data:r.data}})).map(function(r){return r.keys}).flat(),f=(null===(i=u.feePayer)||void 0===i?void 0:i.toBase58())||"";if(0===s.length)throw Error("No instructions found");if(s.length>1)return{from:f};if(s[0].programId.equals(r.SystemProgram.programId)&&s[0].data.length>=9&&2===s[0].data[0])try{return{from:f,to:s[0].keys[1].toBase58(),value:n(s[0].data)}}catch(r){throw r}return{from:f,to:s[0].keys[1].toBase58()}},o=function(n,a){try{a.startsWith("0x")&&(a=a.slice(2));var o=Buffer.from(a,"hex");return r.VersionedTransaction.deserialize(o)}catch(o){var s=t(n);try{if(e(s,r.VersionedTransaction)){var i=s.message.staticAccountKeys;0!==s.signatures.length&&s.signatures.find(function(r){return r.toString().replace(",","")===a})||s.addSignature(i[0],Buffer.from(a,"hex"))}else s.addSignature(s.feePayer,Buffer.from(a,"hex"));return s}catch(r){throw r}}};