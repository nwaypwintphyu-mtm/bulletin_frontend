import { mount } from "@vue/test-utils";
import { vi } from "vitest";
import { createRouter, createWebHistory } from "vue-router";
import Button from "../components/compos/Button.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Test", component: { template: "<div></div>" } },
    { path: "/home", name: "Home", component: { template: "<div></div>" } },
    { path: "/about", name: "About", component: { template: "<div></div>" } },
  ],
});

describe("Button", () => {
  //get label from prop
  it("renders button with label prop", () => {
    const label = "Go to Home";
    const wrapper = mount(Button, {
      props: {
        label,
        router: "/home",
      },
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.text()).toContain(label);
  });

  it("calls navigate method and pushes correct route", async () => {
    const route = "/about";
    const wrapper = mount(Button, {
      props: {
        label: "Go to About",
        route,
      },
      global: {
        plugins: [router],
      },
    });
    const pushSpy = vi.spyOn(router, "push");
    await wrapper.find("button").trigger("click");
    expect(pushSpy).toHaveBeenCalledWith(route);
  });

  it("sets up the correct route when the button is clicked", async () => {
    const route = "/home";
    const wrapper = mount(Button, {
      props: {
        label: "Go to Home",
        route,
      },
      global: {
        plugins: [router],
      },
    });
    const pushSpy = vi.spyOn(router, "push");
    await wrapper.find("button").trigger("click");
    expect(pushSpy).toHaveBeenCalledWith(route);
  });
});
