export default async function handler(req, res) {
  const { fileId } = req.query;
  const token = process.env.BOT_TOKEN; // Hide your token in Vercel Environment Variables

  // 1. Get the file path from Telegram
  const response = await fetch(`https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`);
  const data = await response.json();

  if (data.ok) {
    // 2. Construct the direct download link
    const filePath = data.result.file_path;
    const directLink = `https://api.telegram.org/file/bot${token}/${filePath}`;
    res.status(200).json({ url: directLink });
  } else {
    res.status(500).json({ error: "Could not fetch file" });
  }
}
