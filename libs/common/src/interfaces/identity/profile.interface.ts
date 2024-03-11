import { Gender, ProfileType, State } from '@app/common/enums';

import { Core, Dto, MakeOptional } from '../common';

export interface Profile extends Core {
  type: ProfileType;
  state: State;
  gender: Gender;

  nickname?: string;
  last_name?: string;
  first_name?: string;

  verified_at?: Date;
}

// ----------------------------------------
// Data Object Model Interface
// ----------------------------------------

export type ProfileDto = Dto<MakeOptional<Profile, 'state' | 'gender' | 'type'>>;
