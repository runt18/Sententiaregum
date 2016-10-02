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

import { store } from 'sententiaregum-flux-container';
import userState from './initializer/userState';
import updateUserState from './handler/updateUserState';
import {
  REQUEST_API_KEY,
  LOGOUT,
  CREATE_ACCOUNT,
  ACCOUNT_VALIDATION_ERROR,
  ACTIVATE_ACCOUNT,
  ACTIVATION_FAILURE,
  LOGIN_ERROR
} from '../constants/Portal';

export default store({
  [REQUEST_API_KEY]: {
    params:   ['message'],
    function: updateUserState('auth', ['message'])
  },
  [LOGOUT]: {
    // ...
  },
  [CREATE_ACCOUNT]:           { function: () => updateUserState('creation') },
  [ACCOUNT_VALIDATION_ERROR]: { params: ['errors', 'nameSuggestions'] },
  [ACTIVATE_ACCOUNT]:         {
    // ...
  },
  [ACTIVATION_FAILURE]: {
    // ...
  },
  [LOGIN_ERROR]: {
    // ...
  }
}, userState);
