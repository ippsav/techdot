import { Stream } from "stream";

export interface Upload {
  filename: string;
  createReadStream: () => Stream;
}
