import { defineField, defineType } from "sanity";

export default defineType({
  title: "Product",
  name: "product",
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "text",
    }),
    defineField({
      title: "Price",
      name: "price",
      type: "number",
    }),
    defineField({
      title: "Image",
      name: "image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: "Category",
      name: "category",
      type: "string",
    }),
  ],
});
