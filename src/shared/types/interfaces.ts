/**
 * Player related stuff
 */
export enum PlayerStatus {
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
}

export enum Repeat {
  ALL = 'all',
  ONE = 'one',
  NONE = 'none',
}

export enum SortBy {
  ARTIST = 'artist',
  ALBUM = 'album',
  TITLE = 'title',
  DURATION = 'duration',
  GENRE = 'genre',
}

export enum SortOrder {
  ASC = 'asc',
  DSC = 'dsc',
}

/**
 * Redux
 */
export interface Action {
  // TODO action specific types
  type: string;
  payload?: any;
}

/**
 * Untyped libs / helpers
 */
export type LinvoSchema<Schema> = {
  _id: string;
  find: any;
  findOne: any;
  insert: any;
  copy: any; // TODO better types?
  remove: any;
  save: any;
  serialize: any;
  update: any;
  ensureIndex: any;
  // bluebird-injected
  findAsync: any;
  findOneAsync: any;
  insertAsync: any;
  copyAsync: any;
  removeAsync: any;
  saveAsync: any;
  serializeAsync: any;
  updateAsync: any;
} & {
  [Property in keyof Schema]: Schema[Property];
};

/**
 * App models
 */
export interface Track {
  album: string;
  artist: string[];
  disk: {
    no: number;
    of: number;
  };
  duration: number;
  genre: string[];
  loweredMetas: {
    artist: string[];
    album: string;
    title: string;
    genre: string[];
  };
  path: string;
  playCount: number;
  title: string;
  track: {
    no: number;
    of: number;
  };
  year: number | null;
}

export interface Playlist {
  name: string;
  tracks: string[];
  importPath?: string; // associated m3u file
}

/**
 * Database schemes
 */
export type TrackModel = LinvoSchema<Track>;
export type PlaylistModel = LinvoSchema<Playlist>;

/**
 * Various
 */
export interface Toast {
  _id: number;
  content: string;
  type: ToastType;
}

export type ToastType = 'success' | 'danger' | 'warning';

/**
 * Config
 */

export interface ConfigBounds {
  width: number;
  height: number;
  x: number;
  y: number;
}

export interface Config {
  theme: 'light' | 'dark';
  audioVolume: number;
  audioPlaybackRate: number;
  audioOutputDevice: string;
  audioMuted: boolean;
  audioShuffle: boolean;
  audioRepeat: Repeat;
  librarySort: {
    by: SortBy;
    order: SortOrder;
  };
  // musicFolders: string[],
  sleepBlocker: boolean;
  autoUpdateChecker: boolean;
  minimizeToTray: boolean;
  displayNotifications: boolean;
  bounds: ConfigBounds;
}

/**
 * Themes
 */

export interface Theme {
  _id: string;
  name: string;
  themeSource: 'dark' | 'light' | 'system';
  variables: Record<string, string>;
}
