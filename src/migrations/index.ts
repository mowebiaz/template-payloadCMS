import * as migration_20251014_131052 from './20251014_131052';
import * as migration_20251015_131548 from './20251015_131548';
import * as migration_20251021_140500 from './20251021_140500';
import * as migration_20251126_164124 from './20251126_164124';
import * as migration_20251206_145654 from './20251206_145654';
import * as migration_20251208_132241 from './20251208_132241';

export const migrations = [
  {
    up: migration_20251014_131052.up,
    down: migration_20251014_131052.down,
    name: '20251014_131052',
  },
  {
    up: migration_20251015_131548.up,
    down: migration_20251015_131548.down,
    name: '20251015_131548',
  },
  {
    up: migration_20251021_140500.up,
    down: migration_20251021_140500.down,
    name: '20251021_140500',
  },
  {
    up: migration_20251126_164124.up,
    down: migration_20251126_164124.down,
    name: '20251126_164124',
  },
  {
    up: migration_20251206_145654.up,
    down: migration_20251206_145654.down,
    name: '20251206_145654',
  },
  {
    up: migration_20251208_132241.up,
    down: migration_20251208_132241.down,
    name: '20251208_132241'
  },
];
