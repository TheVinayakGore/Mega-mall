import { defineField, defineType } from "sanity";

export default defineType({
  title: "Product",
  name: "product",
  type: "document",
  fields: [
    defineField({
      title: "Brand",
      name: "brand",
      type: "string",
    }),
    defineField({
      title: "Category",
      name: "category",
      type: "string",
    }),
    defineField({
      title: "Tag",
      name: "tag",
      type: "string",
    }),
    defineField({
      title: "Title",
      name: "title",
      type: "string",
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      title: "Ratings",
      name: "rating",
      type: "number",
    }),
    defineField({
      title: "Reviews",
      name: "review",
      type: "number",
    }),
    defineField({
      title: "Stock",
      name: "stock",
      type: "number",
    }),
    defineField({
      title: "Description",
      name: "description",
      type: "text",
    }),
    defineField({
      title: "Color",
      name: "color",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      title: "Size",
      name: "size",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      title: "Price",
      name: "price",
      type: "number",
    }),
    defineField({
      title: "MRP",
      name: "mrp",
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
      title: "Gallery",
      name: "gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      title: "Likes",
      name: "likes",
      type: "number",
      initialValue: 0,
    }),
  ],
});
