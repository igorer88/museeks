/**
 * Module in charge of setting and manage mpris service for linux
   TODO: fetch cover, handle seek bar, handle volume    
 */
import * as electron from 'electron';
import ModuleWindow from './module-window';
import { TrackModel } from '../../shared/types/interfaces';
import { fetchCover } from '../../shared/utils';
import * as mpris  from 'mpris-service';
const { app, ipcMain } = electron;

class MprisModule extends ModuleWindow {

  player = mpris({
      name: 'museeks',
      identity: 'Musseks Music Player',
      canRaise: true,
      supportedUriSchemes: ['file'],
      supportedMimeTypes: ['audio/mpeg', 'application/ogg'],
      supportedInterfaces: ['player', 'trackList']
  });

  constructor (window: Electron.BrowserWindow) {
    super(window);
    this.platforms = ['linux'];
  }

	async load() {
    this.player.canEditTracks = false;
    this.player.playbackStatus = 'Stopped';
		
    // Manage playbackStatus for the current song
    ipcMain.on('playback:play', () => {
      this.player.playbackStatus = 'Playing';
    });

    ipcMain.on('playback:pause', () => {
      this.player.playbackStatus = 'Paused';
    });

    ipcMain.on('playback:trackChange', async (_e: Event, track: TrackModel) => {
      await this.updateCurrentTrack(track);
      ipcMain.on('playback:play', () => {
        this.player.playbackStatus = 'Playing';
      });
      ipcMain.on('playback:paused', () => {
        this.player.playbackStatus = 'Paused';
      });
    });

    // Manage player actions with mpris
    this.player.on('raise', () => {
      this.window.show();
    });

    this.player.on('quit', () => {
      app.exit();
    });

		this.player.on('playpause', () => {
      this.window.webContents.send('playback:playpause');
		});

    this.player.on('play', () => {
      this.window.webContents.send('playback:play');
      this.player.playbackStatus = 'Playing';
    });

    this.player.on('pause', () => {
      this.window.webContents.send('playback:pause');
      this.player.playbackStatus =  'Paused';
    });

    this.player.on('next', () => {
      this.window.webContents.send('playback:next');
    });

    this.player.on('previous', () => {
      this.window.webContents.send('playback:previous');
    });

    this.player.on('stop', () => {
      this.window.webContents.send('playback:stop');
      this.player.playbackStatus = 'Stopped';
    });
   }

  async updateCurrentTrack (track: TrackModel) {
    let cover = await fetchCover(track.path);
    console.log(cover);
    this.player.canSeek = true;
    this.player.canPlay = true;
    this.player.canPause = true;
    this.player.canGoPrevious = true;
    this.player.canGoNext = true;
    this.player.metadata = {
      // 'xesam:asText': (track.lyrics || ''), //TODO: add lyrics
      'mpris:length': track.duration, 
      'mpris:artUrl': cover,          //TODO: fetch cover
      'xesam:title': track.title,
      'xesam:album': track.album,
      'xesam:artist': track.artist
    };
	}
}

export default MprisModule;
