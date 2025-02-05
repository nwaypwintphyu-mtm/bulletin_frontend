import { flushPromises, mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import Header from "../components/Layouts/Header.vue";
import { createPinia, setActivePinia } from "pinia";
import { useUsersStore } from "../stores/users";

describe("Header", () => {
  let router;
  let wrapper;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createWebHistory(),
      routes: [
        // Add route
        {
          path: "/",
          name: "Home",
          component: { template: "<div></div>" },
        },
        {
          path: "/posts",
          name: "Posts",
          component: { template: "<div></div>" },
        },
        {
          path: "/users",
          name: "Users",
          component: { template: "<div></div>" },
        },
      ],
    });

    // Mocking router.push
    router.push = vi.fn();

    const usersStore = useUsersStore();
    usersStore.current_user = { id: 123, name: "Test User" };
    usersStore.userLogout = vi.fn().mockResolvedValue({ status: 200 });

    wrapper = mount(Header, {
      global: {
        plugins: [router, pinia],
      },
    });
  });

  // Test for initial view
  it("renders initial component correctly", () => {
    expect(wrapper.exists()).toBe(true);

    const brand = wrapper.find(".navbar-brand");
    expect(brand.exists()).toBe(true);
    expect(brand.text()).toBe("Bulletin_Board");

    const links = wrapper.findAll(".nav-link");
    const dropDown = wrapper.find(".dropdown");

    expect(links[0].text()).toBe("Users");
    expect(links[1].text()).toBe("Posts");
    expect(links[2].text()).toBe("Create User");
    expect(dropDown.exists()).toBe(true);
  });

  // Test for link navigation
  it("renders correct route when clicking a link", async () => {
    const userLink = wrapper.findAll(".nav-link")[0];
    const postLink = wrapper.findAll(".nav-link")[1];
    const createUserLink = wrapper.findAll(".nav-link")[2];

    await userLink.trigger("click");
    expect(router.push).toHaveBeenCalledWith({ name: "Users" });

    await postLink.trigger("click");
    expect(router.push).toBeCalledWith({ name: "Posts" });

    await createUserLink.trigger("click");
    expect(router.push).toBeCalledWith({ name: "Register" });
  });

  // Test for dropdown item click
  it("opens profile and triggers navigation on click", async () => {
    const dropDownMenu = wrapper.find(".dropdown-menu");
    const buttons = dropDownMenu.findAll(".dropdown-item");
    const profile = buttons[0];
    const logout = buttons[1];

    expect(profile.text()).toBe("Profile");
    expect(logout.text()).toBe("Logout");

    await profile.trigger("click");
    expect(router.push).toHaveBeenCalledWith({ name: "UserProfile" });
  });

  //Test for logout button click
  it("redirects to login page when success logout", async () => {
    const logoutButton = wrapper.findAll(".dropdown-item")[1];

    await logoutButton.trigger("click");

    await flushPromises();
    
    expect(router.push).toHaveBeenCalledWith({ name: "Login" });
    expect(useUsersStore().userLogout).toHaveBeenCalledTimes(1);
    expect(useUsersStore().userLogout).toHaveBeenCalledWith(123);
  });
});
