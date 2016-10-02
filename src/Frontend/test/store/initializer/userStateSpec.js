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

import userState from '../../../store/initializer/userState';
import ApiKey from '../../../util/http/ApiKey';
import { stub } from 'sinon';
import { expect } from 'chai';
import deepEqual from 'deep-equal';

describe('userState', () => {
  it('builds the default state', () => {
    stub(ApiKey, 'getUsername', () => 'Ma27');
    stub(ApiKey, 'isLoggedIn', () => true);
    stub(ApiKey, 'isAdmin', () => true);
    stub(ApiKey, 'getApiKey', () => 'key');

    expect(deepEqual(userState(), {
      data: {
        is_admin: true,
        key:      'key',
        username: 'Ma27'
      },
      is_logged_in: true,
      activation:   { success: false },
      creation:     null,
      auth:         { message: null }
    })).to.equal(true);

    ApiKey.getUsername.restore();
    ApiKey.isLoggedIn.restore();
    ApiKey.isAdmin.restore();
    ApiKey.getApiKey.restore();
  });
});
