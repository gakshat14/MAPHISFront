import { describe, it } from 'vitest';

import { mount } from '@vue/test-utils';
import LogoutButton from '../LogoutButton.vue';

describe('LogoutButton', () => {
    it('Test whether the button renders correctly', () => {
        const wrapper = mount(LogoutButton, { props: { msg: 'Hello Vitest' } });
        console.log(wrapper.attributes);
    });
});
