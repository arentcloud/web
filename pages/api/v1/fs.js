// This would be stored in a database or something
import fs from "fs";
import path from "path";

const authorizedApps = [
  "files"
];

const user = "wyatt";

export default function handler(req, res) {
  const url = new URL(req.headers.referer);
  if (!url.pathname.startsWith("/apps/")) {
    res.status(401).json({ error: "Unauthorized" });
  }
  const app = url.pathname.substring("/apps/".length);
  if (!authorizedApps.includes(app)) {
    res.status(401).json({ error: "Unauthorized" });
  }

  const files = fs.readdirSync(path.join(process.env.ARENTCLOUD_DATA, user)).map(file => {
    const stat = fs.lstatSync(path.join(process.env.ARENTCLOUD_DATA, user, file));
    return {
      name: file,
      isDirectory: stat.isDirectory(),
      size: stat.size,
    }
  });

  res.status(200).json(files)
}
