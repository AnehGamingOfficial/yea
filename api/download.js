const { exec } = require('child_process');

export default async function handler(req, res) {
  const videoUrl = req.query.url;

  if (!videoUrl) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  // Execute yt-dlp command to download video
  exec(`yt-dlp ${videoUrl} -o /tmp/video.mp4`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ error: 'Failed to download video' });
    }

    console.log(`Success: ${stdout}`);
    res.status(200).json({ message: 'Video downloaded successfully' });
  });
}
