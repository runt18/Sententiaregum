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

import { shallow } from 'enzyme';
import React from 'react';
import AppMenu from '../../../../components/app/layout/AppMenu';
import { expect } from 'chai';

describe('AppMenuSpec', () => {
  it('renders the menu markup', () => {
    const items = [
      {
        url:   '/#/',
        label: 'Landing page'
      }
    ];

    const markup  = shallow(<AppMenu config={items} />);
    const wrapper = markup.find('MenuWrapper > Menu');

    expect(wrapper.prop('items')).to.equal(items);
  });
});
