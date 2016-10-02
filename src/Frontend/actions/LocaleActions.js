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

import { GET_LOCALES, CHANGE_LOCALE } from '../constants/Locale';
import Locale from '../util/http/Locale';
import UserStore from '../store/UserStore';
import getStateValue from '../store/provider/getStateValue';
import axios from 'axios';
import ApiKey from '../util/http/ApiKey';

/**
 * Action creator for the language loader.
 *
 * @returns {Function} The language initialization action.
 */
export function loadLanguages() {
  return dispatch => axios.get('/api/locale.json').then(locales => dispatch(GET_LOCALES, { locales }));
}

/**
 * Action creator for the locale change.
 *
 * @param {String} locale The new locale.
 *
 * @returns {Function} The action.
 */
export function changeLocale(locale) {
  return dispatch => {
    Locale.setLocale(locale);
    if (getStateValue(UserStore, 'is_logged_in', false)) {
      axios.patch('/api/protected/locale.json', { locale }, {
        headers: { 'X-API-KEY': ApiKey.getApiKey() }
      });
    }

    dispatch(CHANGE_LOCALE, { locale });
  };
}
