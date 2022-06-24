import { argv } from 'node:process';
import axios from "axios";
import fs from "fs"
import { uid } from 'uid';
import exec from "await-exec";
/*
import {execLive} from "./exec.js";
//import {exec} from "node:child_process";
import util from "node:util";
*/
import { upload } from 'youtube-videos-uploader'

const url = argv[2]
const title = argv[3]

console.log("url: "+url)
const url_720 =  url.replace("master", "hls/720/main")
//console.log(url_720)

const urlJson = new URL(url_720)
const query = urlJson.search? urlJson.search : ""
const urlPath = urlJson.origin+urlJson.pathname.slice(0, urlJson.pathname.lastIndexOf('/'));
//console.log(query,urlPath)
const id = uid();

axios.get(url_720)
  .then(async function (response) {
    // handle success
    console.log("GOT The m3u8 file");
    const m3u8 = response.data;
    const myArray = m3u8.split("\n");
    let m3u8New =""
    myArray.forEach((el,i)=> {
     // console.log(el)
      if (el.indexOf(".ts") >= 0) {
        m3u8New += `${urlPath}/${el}${query}`
        m3u8New += "\n"
      } else {
      m3u8New += el
      m3u8New += "\n"
      }
    })

    console.log(m3u8New)
   await fs.writeFileSync(`/tmp/${id}-main.m3u8`, m3u8New);
       console.log("✅ m3u8 created")

   try {
     console.log("Downloading video...")
     

    await exec(
      `ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i /tmp/${id}-main.m3u8 -c copy -bsf:a aac_adtstoasc /tmp/${id}-video.mp4`)


/*
// promisify exec
const execPromise = util.promisify(exec);

try {
  // wait for exec to complete
  console.log(1)
  const {stdout, stderr} = await execPromise(`ffmpeg -protocol_whitelist file,http,https,tcp,tls,crypto -i /tmp/${id}-main.m3u8 -c copy -bsf:a aac_adtstoasc /tmp/${id}-video.mp4`);
  console.log(2)
  console.log(stdout,stderr)
} catch (error) {
  console.log(error);
}
*/
 console.log("✅  video created")

const credentials = { email: 'contact.pwclass@gmail.com', pass: '@hsakA321#', recoveryemail: 'akashdeepdas321@gmail.com' }

// minimum required options to upload video
//const video1 = { path: 'video.mp4', title: 'title 1', description: 'description 1' }

const onVideoUploadSuccess = (videoUrl) => {
    // ..do something..
    console.log(videoUrl,"success")
    process.exit(1)     
}
// Extra options like tags, thumbnail, language, playlist etc
const video = {
  path: `/tmp/${id}-video.mp4`,
  title: title,
  description: '',
  //thumbnail:'thumbnail.png', 
  language: 'english', 
 // tags: ['video', 'github'], 
  //playlist: 'playlist name',
 channelName: 'PWclass', 
  onSuccess:onVideoUploadSuccess, skipProcessingWait: true, onProgress: (progress) => { console.log('progress', progress) } }



// This package uses Puppeteer, you can also pass Puppeteer launch configuration
upload (credentials, [video], {
  headless: true,
  
       executablePath: '/usr/bin/chromium-browser',
       args: [
       "--no-sandbox",
       "--disable-gpu",
       ]
}).then(console.log);
    
  } catch (err) {
    console.log(err)
    process.exit(1)     
  }
 
  })
  .catch(function (error) {
    // handle error
    console.log("Failed to get the m3u8 file");
    process.exit(1)
  })
  
  

