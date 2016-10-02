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

import userStore from '../userStore';
import invariant from 'invariant';

/**
 * Generic handler which will be called to update the user state
 * for certain sections in its own state.
 *
 * @param {String} stateSection The place to fetch.
 * @param {Array}  params       The params to put into the section.
 *
 * @returns {Function} The state modification handler.
 */
export default (stateSection, params = []) => {
  const state    = userStore.getState();
  const isScalar = (data, params) => 1 === data.length && 0 === params.length;
  invariant(
    'undefined' !== typeof state[stateSection],
    `Invalid state section "${stateSection}" for user state!`
  );

  return (...data) => Object.assign({}, state, {
    [stateSection]: isScalar(data, params) ? data[0] : params.reduce((prev, cur, i) => Object.assign(
      {},
      prev,
      { [cur]: data[i] }
    ), {})
  });
};
