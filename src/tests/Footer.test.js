import { mount } from "@vue/test-utils";
import Footer from "../components/Layouts/Footer.vue";

describe("Footer", () => {
  //test for initail rendering
  it("should render correctly with necessary components", () => {
    const wrapper = mount(Footer);
    const content = wrapper.findAll(".text-success");

    const companyName = content[0];
    expect(companyName.exists()).toBe(true);
    expect(companyName.text()).toBe("Seattle Consulting Myanmar");

    const termsPrivacy = content[1];
    expect(termsPrivacy.exists()).toBe(true);
    expect(termsPrivacy.text()).toBe(
      "Copyright © Seattle Consulting Myanmar Co., Ltd. All rights reserved."
    );
  });
});
