import { beforeEach, describe, expect, test } from "vitest";
import VictoryModal from "../VictoryModal.vue";
import { mount, VueWrapper } from "@vue/test-utils";
import { i18n } from "@/i18n";

describe('VictoryModal.vue', () => {
    test('should render win message', () => {
        const wrapper = mount(VictoryModal, {global: {plugins: [i18n] }, props: {win: true, finished: true}});
        expect(wrapper.find('.modal').exists()).toBe(true);
        expect(wrapper.text()).toContain('🎉');
        expect(wrapper.text()).toContain(i18n.global.messages.value.en.victoryModal.win);
        expect(wrapper.text()).toContain(i18n.global.messages.value.en.victoryModal.thanks);
    });

    test('should render lose message', () => {
        const wrapper = mount(VictoryModal, {global: {plugins: [i18n] }, props: {win: false, finished: true}});
        expect(wrapper.find('.modal').exists()).toBe(true);
        expect(wrapper.text()).toContain('😢');
        expect(wrapper.text()).toContain(i18n.global.messages.value.en.victoryModal.lose);
        expect(wrapper.text()).toContain(i18n.global.messages.value.en.victoryModal.thanks);
    });

    test('should render if finished is false', () => {
        const wrapper = mount(VictoryModal, {global: {plugins: [i18n] }, props: {win: false, finished: false}});
        expect(wrapper.find('.modal').exists()).toBe(false);
        expect(wrapper.text()).toContain('');
    });

    test('should render button with correct text', () => {
        const wrapper = mount(VictoryModal, {global: {plugins: [i18n] }, props: {win: false, finished: true}});
        const button = wrapper.find('button');

        expect(wrapper.find('.modal').exists()).toBe(true);
        expect(button.text()).toContain(i18n.global.messages.value.en.victoryModal.button);
    });
/* 
    test('should navigate to home page when button is clicked', () => {
        const wrapper = mount(VictoryModal, {global: {plugins: [i18n] }, props: {win: false, finished: true}});
        const button = wrapper.find('button');

        button.trigger('click');
        expect(wrapper.vm.$route.path).toBe('/');
    }); */
})