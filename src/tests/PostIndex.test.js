import { mount } from "@vue/test-utils";
import PostIndex from "../components/pages/posts/index.vue";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";

describe("PostIndex", () => {
  let pinia;
  let router;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createWebHistory,
      routes: [
        { path: "/posts/create/:id", name: "create-post-id", component: {} },
      ],
    });

    router.push = vi.fn().mockResolvedValue();
  });

  //renders page with all necessary components
  it("renders page with all necessary components", () => {
    const wrapper = mount(PostIndex);
    expect(wrapper.exists()).toBe(true);

    const header = wrapper.find("nav");
    expect(header.exists()).toBe(true);

    const footer = wrapper.find("footer");
    expect(footer.exists()).toBe(true);

    const searchBox = wrapper.find("input[type='text']");
    expect(searchBox.exists()).toBe(true);

    const buttons = wrapper.findAll(".btn");
    const bulletinButton = buttons[0];
    expect(bulletinButton.exists()).toBe(true);
    expect(bulletinButton.text()).toBe("Bulletin_Board");

    const searchButton = buttons[1];
    expect(searchButton.exists()).toBe(true);
    expect(searchButton.text()).toBe("Search");

    const createButton = buttons[2];
    expect(createButton.exists()).toBe(true);
    expect(createButton.text()).toBe("Create");

    const uploadButton = buttons[3];
    expect(uploadButton.exists()).toBe(true);
    expect(uploadButton.text()).toBe("Upload");

    const downLoadButton = buttons[4];
    expect(downLoadButton.exists()).toBe(true);
    expect(downLoadButton.text()).toBe("Download");

    const postsTable = wrapper.find("table");
    expect(postsTable.exists()).toBe(true);
  });

  //should call search() method  when search button is clicked
  it("should call search method when search button is clicked", async () => {
    const wrapper = mount(PostIndex);
    const searchSpy = vi.spyOn(wrapper.vm, "search");

    const searchButton = wrapper.findAll(".btn")[1];
    await searchButton.trigger("click");

    expect(searchSpy).toHaveBeenCalled();
  });

  //test for create button click
  it("should redirect to create page when click create button", async () => {
    const mockPush = vi.fn();

    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/posts/create", name: "create-post", component: {} },
        { path: "/posts/create/:id", name: "create-post-id", component: {} },
      ],
    });

    const wrapper = mount(PostIndex, {
      global: {
        plugins: [router],
      },
    });

    router.push = mockPush;

    const createButton = wrapper.findAll(".btn")[2];
    await createButton.trigger("click");

    await router.isReady();
    expect(mockPush).toHaveBeenCalledWith({ path: "/posts/create" });
  });
});
