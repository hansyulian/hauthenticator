import axios from "axios";

export class AppGoogleDrive {
  public accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  public async saveFile(name: string, content: string) {
    // Create a file in Google Drive
    try {
      const createFileResponse = await axios.post(
        "https://www.googleapis.com/upload/drive/v3/files",
        {
          resource: {
            name,
            parents: ["appDataFolder"]
          }
        },
        {
          headers: {
            ...this.baseHeaders,
            "Content-Type": "application/json",
          },
          params: {
            ...this.baseParams,
            uploadType: "media",
          }
        }
      );
      const fileId = createFileResponse.data.id;
      console.log("create file id", fileId);
      const uploadResponse = await axios.put(
        `https://www.googleapis.com/upload/drive/v3/files/${fileId}`,
        content,
        {
          headers: {
            ...this.baseHeaders,
            "Content-Type": "application/octet-stream",
          },
          params: {
            ...this.baseParams,
          }
        }
      );
      console.log(uploadResponse.data);
    } catch (err) {
      console.log(err.response.data);
    }
  }
  public async getFile(name: string) {
    const fileNameResponse = await axios.get("https://www.googleapis.com/drive/v3/files", {
      headers: {
        ...this.baseHeaders,
      },
      params: {
        ...this.baseParams,
        q: `name='${name}'`, // Search by file name
      },
    });
    const files = fileNameResponse.data.files;
    if (!files || files.length === 0) {
      return undefined;
    }
    const fileId = files[0].id;

    const response = await axios.get(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
      headers: {
        ...this.baseHeaders,
      },
      params: {
        ...this.baseParams,
      },
      responseType: "arraybuffer", // Ensure binary data is received correctly
    });
    if (!response.data) {
      return undefined;
    }
    return response.data.toString("utf8");
  }
  public async test() {
    try {
      const fileNameResponse = await axios.get("https://www.googleapis.com/drive/v3/files", {
        headers: {
          ...this.baseHeaders,
        },
        params: {
          spaces: "appDataFolder"
        }
      });
      const files = fileNameResponse.data.files;
      console.log(files);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  private get baseHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`
    };
  }

  private get baseParams() {
    return {
      spaces: "appDataFolder",
    };
  }
}