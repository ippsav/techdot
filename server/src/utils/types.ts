import { Stream } from "stream";

export interface Upload {
  mimetype: string;
  filename: string;
  createReadStream: () => Stream;
}
