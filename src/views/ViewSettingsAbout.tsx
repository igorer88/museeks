import { useLoaderData } from 'react-router-dom';

import * as Setting from '../components/Setting';
import CheckboxSetting from '../components/SettingCheckbox';
import Button from '../elements/Button';
import ExternalButton from '../elements/ExternalButton';
import ExternalLink from '../elements/ExternalLink';
import Flexbox from '../elements/Flexbox';
import Heart from '../elements/Heart';
import useInvalidate, { useInvalidateCallback } from '../hooks/useInvalidate';
import SettingsAPI from '../stores/SettingsAPI';
import type { SettingsLoaderData } from './ViewSettings';

export default function ViewSettingsAbout() {
  const { config, version, tauriVersion, appStorageDir } =
    useLoaderData() as SettingsLoaderData;

  const invalidate = useInvalidate();

  return (
    <div className="setting setting-about">
      <Setting.Section>
        <Setting.Title>About Museeks</Setting.Title>
        <Setting.Description>
          Museeks {version}
          {' - '}
          <ExternalLink href="http://museeks.io">museeks.io</ExternalLink>
          {' - '}
          <ExternalLink
            href={`https://github.com/martpie/museeks/releases/tag/${version}`}
          >
            release notes
          </ExternalLink>{' '}
        </Setting.Description>
        <CheckboxSetting
          slug="update"
          title="Automatically check for updates"
          value={config.auto_update_checker}
          onChange={useInvalidateCallback(SettingsAPI.toggleAutoUpdateChecker)}
        />
        <div>
          <Button
            onClick={() => {
              SettingsAPI.checkForUpdate().then(invalidate);
            }}
          >
            Check for update
          </Button>
        </div>
      </Setting.Section>
      <Setting.Section>
        <Setting.Title>Contributors</Setting.Title>
        <Setting.Description>
          Made with <Heart /> by Pierre de la Martinière (
          <ExternalLink href="https://martpie.io">@martpie</ExternalLink>) and a
          bunch of{' '}
          <ExternalLink href="https://github.com/martpie/museeks/graphs/contributors">
            great people
          </ExternalLink>
          .
        </Setting.Description>
      </Setting.Section>
      <Setting.Section>
        <Setting.Title>Report issue / Ask for a feature</Setting.Title>
        <Setting.Description>
          Bugs happen. Please, do not hesitate to report them or to ask for
          features you would like to see, using the{' '}
          <ExternalLink href="http://github.com/martpie/Museeks/issues">
            issue tracker
          </ExternalLink>
          .
        </Setting.Description>
      </Setting.Section>
      <Setting.Section>
        <Setting.Title>Internals</Setting.Title>
        <Setting.Description>Tauri {tauriVersion}</Setting.Description>
        <Flexbox gap={4}>
          <ExternalButton href={appStorageDir}>
            Open storage directory
          </ExternalButton>
        </Flexbox>
      </Setting.Section>
    </div>
  );
}
