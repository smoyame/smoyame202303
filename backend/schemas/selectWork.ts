// schemas/selectWork.ts
export default {
  name: 'selectWork',
  title: 'My Works',
  type: 'document',
  fields: [
    {
      name: 'list',
      title: 'List',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Item',
          type: 'reference',
          to: [{type: 'project'}],
        },
      ],
    },
  ],
}
