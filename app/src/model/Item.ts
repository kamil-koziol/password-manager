/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import fs from "fs-extra";
import path from "path";

export default class Item {
  name: string;

  username: string;

  password: string;

  website: string | undefined;

  totp: string | undefined;

  constructor(name: string, username: string, password: string) {
    this.name = name;
    this.username = username;
    this.password = password;
  }

  // async fetchWebsiteLogo(): Promise<string> {
  //   const { website } = this;
  //   const defaultLogoPath = path.join(__dirname, "default-logo.png");
  //   const logoDirectory = path.join(__dirname, "logo-directory");
  //   const logoPath = path.join(logoDirectory, `${this.name}-logo.ico`);

  //   // Check if logo already exists in the directory
  //   if (await fs.pathExists(logoPath)) {
  //     return logoPath;
  //   }

  //   try {
  //     const response = await axios.get(`${website}/favicon.ico`, {
  //       responseType: "arraybuffer",
  //     });

  //     await fs.outputFile(logoPath, response.data);

  //     return logoPath;
  //   } catch (error) {
  //     console.error("Error fetching website logo:", error);
  //     return defaultLogoPath;
  //   }
  // }
}
