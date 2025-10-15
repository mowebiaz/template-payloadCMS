import * as migration_20251014_131052 from './20251014_131052';
import * as migration_20251015_131548 from './20251015_131548';

export const migrations = [
  {
    up: migration_20251014_131052.up,
    down: migration_20251014_131052.down,
    name: '20251014_131052',
  },
  {
    up: migration_20251015_131548.up,
    down: migration_20251015_131548.down,
    name: '20251015_131548'
  },
];
