import * as React from 'react';

import * as Setting from '../../components/Setting/Setting';
import * as PlayerActions from '../../actions/PlayerActions';
import { Config } from '../../../shared/types/interfaces';

interface Props {
  config: Config;
}

export default class SettingsAudio extends React.Component<Props> {
  setPlaybackRate (e: React.SyntheticEvent<HTMLInputElement>) {
    PlayerActions.setPlaybackRate(parseInt(e.currentTarget.value, 10));
  }

  render () {
    const { config } = this.props;

    return (
      <div className='setting setting-audio'>
        <Setting.Section>
          <Setting.Label htmlFor='setting-playbackrate'>
            Playback rate
          </Setting.Label>
          <Setting.Input
            id='setting-playbackrate'
            defaultValue={`${config.audioPlaybackRate}`}
            onChange={this.setPlaybackRate}
            type='number'
            min='0.5'
            max='5'
            step='0.1'
          />
          <Setting.Description>Increase the playback rate: a value of 2 will play your music at a 2x speed</Setting.Description>
        </Setting.Section>
      </div>
    );
  }
}
