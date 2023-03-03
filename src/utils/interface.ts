import { User } from 'src/schemas/user.schema';

export interface Mapping {
  script: number;
  expr: number;
  lhsraw: string;
  mode: string;
  sid: number;
  nowait: number;
  rhs: string;
  lhs: string;
  silent: number;
  buffer: number;
  lnum: number;
  noremap: number;
}

export interface SimplifiedMapping {
  lhs: string;
  rhs: string;
}

export interface UpdatePluginsDTO {
  plugins: object;
  key: string;
  keymappings: Array<Mapping>;
}

export interface ReqUser {
  user: User;
}
