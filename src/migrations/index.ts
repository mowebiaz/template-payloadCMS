import * as migration_20251014_131052 from './20251014_131052';

export const migrations = [
  {
    up: migration_20251014_131052.up,
    down: migration_20251014_131052.down,
    name: '20251014_131052'
  },
];
