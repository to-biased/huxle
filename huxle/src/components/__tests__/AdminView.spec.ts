import { describe, expect, test } from "vitest";
import AdminView from "../AdminView.vue";
import { mount } from "@vue/test-utils";
import { i18n } from "@/i18n";


describe('AdminView.vue', () => {
    test('show error messages if fields are empty', async () => {
        const wrapper = mount(AdminView, {global: {plugins: [i18n] }});
        const button = wrapper.find('button');

        button.trigger('click');
        await wrapper.vm.$nextTick();
       
        expect(wrapper.find('.a').exists()).toBe(true);
        const texts = wrapper.findAll('.a').map((a) => a.text());
        expect(texts).toContain('German field must not be empty.');
        expect(texts).toContain('English field must not be empty.');
    });

/*     test('show error messages if fields have incorrect length', async () => {
        const wrapper = mount(AdminView, {global: {plugins: [i18n] }, formState: {germanword: "abc", englishword: "abcdef"}});
        wrapper.setData({ formState: { germanword: 'abcde', englishword: 'abcde' }});
        const button = wrapper.find('button');
        
        button.trigger('click');
        await wrapper.vm.$nextTick();
       
        expect(wrapper.find('.a').exists()).toBe(true);
        const texts = wrapper.findAll('.a').map((a) => a.text());
        expect(texts).toContain('German word must have 5 letters.');
    }); */

})