import { upload } from 'youtube-videos-uploader'
// recoveryemail is optional, only required to bypass login with recovery email if prompted for confirmation
const credentials = { email: 'akashdeepdas970@gmail.com', pass: '@hsakA321#', recoveryemail: 'akashdeepdas321@gmail.com' }

// minimum required options to upload video
//const video1 = { path: 'video.mp4', title: 'title 1', description: 'description 1' }

const onVideoUploadSuccess = (videoUrl) => {
    // ..do something..
    console.log(videoUrl,"success")
}
// Extra options like tags, thumbnail, language, playlist etc
const video = {
  path: '09ca0396689-video.mp4',
  title: 'title 2',
  description: 'description 2',
  //thumbnail:'thumbnail.png', 
  language: 'english', 
  tags: ['video', 'github'], 
  //playlist: 'playlist name',
  channelName: 'Akashdeep Das', 
  onSuccess:onVideoUploadSuccess, skipProcessingWait: true, onProgress: (progress) => { console.log('progress', progress) } }



// This package uses Puppeteer, you can also pass Puppeteer launch configuration
upload (credentials, [video], {
  headless: true,
    //   executablePath: '/usr/bin/chromium-browser',
       args: [
       "--no-sandbox",
       "--disable-gpu",
       ]
}).then(console.log)
