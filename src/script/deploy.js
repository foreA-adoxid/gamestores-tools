import axios from "axios";
import fs from "fs";

import { join, dirname } from "path";
import { fileURLToPath } from "url";

const headers = {
  "User-Agent": "Mozilla/5.0 (Linux x86_64) Firefox/107.0",
  "X-XSRF-TOKEN": "example",
  Cookie: "example",
};

const store_id = 1;

const getDataFile = (path, debugJs = false) => {
  return new Promise((resolve, reject) => {
    try {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      let pathFile = join(__dirname, "..", "..", "dist", path);

      if (debugJs) {
        pathFile = join(__dirname, "..", "obfuscation", "main.js");
      }

      const file = fs.readFileSync(pathFile, {
        encoding: "utf8",
        flag: "r",
      });

      if (debugJs) {
        return resolve(file);
      }

      const data = file.split("**/")[1];

      return resolve(data);
    } catch (error) {
      return reject(error);
    }
  });
};

const deploy = (css, js) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(
        "https://panel.gamestores.app/files/panel/backend/stores/stores.advanced_appearance.php",
        {
          action: "save",
          id: store_id,
          code: {
            css,
            js,
          },
        },
        {
          withCredentials: true,
          headers,
        }
      );

      return resolve(response);
    } catch (error) {
      return reject(error);
    }
  });
};

try {
  const css = await getDataFile("gamestores-css.css");
  const js = await getDataFile("gamestores-js.js");

  const { data } = await deploy(css, js);
  console.log("[Gamestores]: Info - ", data.result);
} catch (error) {
  console.log("[Gamestores]: Error - ", error);
}
