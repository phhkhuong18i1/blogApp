import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl text-center my-7">About Khuong Blog</h1>
          <div className="text-md flex flex-col gap-6">
            <p>
              There are a variety of blog design structures to choose from, each
              with its own set of advantages and disadvantages. All good blog
              templates will allow for some degree of customization, including
              the ability to select the layout type and the number of columns.
              If you want to highlight a single, full-page post, you can do so
              on its dedicated page. A blog typically includes a header, main
              content area, sidebar, and footer. The header may include
              navigation or menu items, while the sidebar might feature social
              media icons, favorite content, or call-to-action buttons. The
              footer usually contains links to the blog's policies and contact
              information. A typical blog has a main section divided into
              different subsections - each with its purpose. Also, today
              multiple blogs have a comment section to push the readers to
              interact with the brand directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
