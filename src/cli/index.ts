import program from "commander";

import { sync } from "./sync";

program
  .command("sync url")
  .description("sync youtube playlist with local files")
  .option("-f, --format <format>", "mp3,mp4", /mp3|mp4/u, "mp3")
  .action(sync);

program.parse(process.argv);
