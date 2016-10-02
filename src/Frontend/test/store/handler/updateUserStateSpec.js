/*
 * This file is part of the Sententiaregum project.
 *
 * (c) Maximilian Bosch <maximilian.bosch.27@gmail.com>
 * (c) Ben Bieler <benjaminbieler2014@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

'use strict';

import updateUserState from '../../../store/handler/updateUserState';
import { expect } from 'chai';
import deepEqual from 'deep-equal';

describe('updateUserState', () => {
  it('tries to modify an invalid state section', () => {
    expect(() => updateUserState('bar', [])).to.throw('Invalid state section "bar" for user state!');
  });

  it('modifies a single state section', () => {
    expect(deepEqual(updateUserState('activation', ['success'])(true), {
      data: {
        is_admin: false,
        key:      null,
        username: null
      },
      is_logged_in: false,
      activation:   { success: true },
      creation:     null,
      auth:         { message: null }
    })).to.equal(true);
  });

  it('modifies a scalar value', () => {
    expect(deepEqual(updateUserState('is_logged_in', [])(true), {
      data: {
        is_admin: false,
        key:      null,
        username: null
      },
      is_logged_in: true,
      activation:   { success: false },
      creation:     null,
      auth:         { message: null }
    })).to.equal(true)
  });
});
