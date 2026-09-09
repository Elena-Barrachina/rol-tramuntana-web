import { appendFile, readFile } from "node:fs/promises";
import { join } from "node:path";

const homepage = join(".next", "server", "app", "index.html");
const message = "<!--If you are reading this, maybe you should check NotPron.-->";
const markup = await readFile(homepage, "utf8");

if (!markup.endsWith(message)) {
  await appendFile(homepage, message);
}
