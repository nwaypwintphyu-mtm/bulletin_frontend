import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import { useUsersStore } from "../stores/users";
import Login from "../components/pages/Login.vue";
import { flushPromises } from "@vue/test-utils";

describe("Login", () => {
  let wrapper;
  let router;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "Login", component: { template: "<div></div>" } },
        {
          path: "/posts",
          name: "Posts",
          component: { template: "<div></div>" },
        },
        {
          path: "/forgot",
          name: "Forgot",
          component: { template: "<div></div>" },
        },
      ],
    });

    // Spy on router when success login
    router.push = vi.fn().mockResolvedValue(); // Mock failure for testing

    wrapper = mount(Login, {
      global: {
        plugins: [pinia, router],
      },
    });
  });

  // Test to ensure the form has all necessary fields
  it("renders the login form correctly with all fields", () => {
    const emailInput = wrapper.find("input#email");
    expect(emailInput.exists()).toBe(true);

    const passwordInput = wrapper.find("input#password");
    expect(passwordInput.exists()).toBe(true);

    const rememberMeCheckbox = wrapper.find('input[type="checkbox"]');
    expect(rememberMeCheckbox.exists()).toBe(true);

    const loginButton = wrapper.find('button[type="submit"]');
    expect(loginButton.exists()).toBe(true);
  });

  // Test email validation when the email is blank
  it("shows an error when email is blank and form is submitted", async () => {
    const emailInput = wrapper.find("input#email");
    const loginButton = wrapper.find('button[type="submit"]');

    await emailInput.setValue("");
    await loginButton.trigger("submit");

    const emailError = wrapper.find(".text-danger");
    expect(emailError.exists()).toBe(true);
    expect(emailError.text()).toBe("Email can't be blank");
  });

  // Test email validation for an invalid email format
  it("shows an error when the email format is invalid and form is submitted", async () => {
    const emailInput = wrapper.find("input#email");
    const loginButton = wrapper.find("button[type='submit']");

    await emailInput.setValue("user@domain");
    await loginButton.trigger("submit");

    const emailFormatError = wrapper.find(".text-danger");
    expect(emailFormatError.exists()).toBe(true);
    expect(emailFormatError.text()).toBe("Email format is invalid");
  });

  // Test password validation when the password is blank
  it("shows an error when the password is blank and form is submitted", async () => {
    const passwordInput = wrapper.find("input#password");
    const loginButton = wrapper.find("button[type='submit']");

    await passwordInput.setValue("");
    await loginButton.trigger("submit");

    const passwordError = wrapper.findAll(".text-danger").at(1); // To get second error message
    expect(passwordError.exists()).toBe(true);
    expect(passwordError.text()).toBe("Password can't be blank");
  });

  // Test that clicking the "forgot" button redirects to the forgot page
  it("forgot button redirects to the forgot page", async () => {
    const forgotButton = wrapper.find("a[href='/forgot']");
    expect(forgotButton.exists()).toBe(true);

    await forgotButton.trigger("click");

    expect(router.push).toHaveBeenCalledWith("/forgot");
  });

  // Test for successful login and redirection to /posts
  it("logs in successfully and redirects to /posts", async () => {
    // Set email and password input
    await wrapper.find("input#email").setValue("test@example.com");
    await wrapper.find("input#password").setValue("password123");

    // Mock successful login
    useUsersStore().userLogin = vi.fn().mockResolvedValue({ status: 200 });

    // Click the login button
    await wrapper.find("form").trigger("submit.prevent");

    // Wait for promises to resolve
    await flushPromises();

    // Check if the router pushes to the correct path
    expect(router.push).toHaveBeenCalledWith({ path: "/posts" });

    // Verify that login was called once with the correct credentials
    expect(useUsersStore().userLogin).toHaveBeenCalledTimes(1);
    expect(useUsersStore().userLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
