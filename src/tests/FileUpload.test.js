import { mount } from "@vue/test-utils";
import FileUpload from "../components/compos/FileUpload.vue";

describe("FileUpload", () => {
  //shows 'No file chosen' , before no file is selected
  it("shows 'No file chosen' , before no file is selected", () => {
    const wrapper = mount(FileUpload);
    expect(wrapper.text()).toContain("No file chosen");
  });

  //shows correct image name from props after file is selected
  it("shows initial image name from props if exist", () => {
    const initialImage = "test.jpg";
    const wrapper = mount(FileUpload, {
      props: { initialImage },
    });
    expect(wrapper.text()).toContain(initialImage);
  });

  // shows selected image name when selected a file
  it("shows selected file name when a file is selected", async () => {
    const wrapper = mount(FileUpload);
    const file = new File(["image-content"], "test.jpg", { type: "image/jpg" });
    const fileInput = wrapper.find('input[type="file"]');

    //set file value
    Object.defineProperty(fileInput.element, "files", {
      value: [file],
      writable: false,
    });

    await fileInput.trigger("change");

    expect(wrapper.text()).toContain("test.jpg");
  });

  //emit selected file to parent component
  it("emit 'file-selected' event with the selected file", async () => {
    const wrapper = mount(FileUpload);
    const file = new File(["image-content"], "test.jpg", { type: "image/jpg" });
    const fileInput = wrapper.find('input[type="file"]');

    //set file value
    Object.defineProperty(fileInput.element, "files", {
      value: [file],
      writable: false,
    });

    //click
    await fileInput.trigger("change");

    //sent emit
    expect(wrapper.emitted("file-selected")).toBeTruthy();
    //sent emit with correct file
    expect(wrapper.emitted("file-selected")[0]).toEqual([file]);
  });
});
