// deskStructure.ts
// *** Reference used: https://www.sanity.io/docs/structure-builder-reference#1e6a04652e80
// todo--make reusable
export const myStructure = (S: any) =>
  S.list()
    .title('Content Types')
    .items([
      S.documentListItem().id('selectWork').schemaType('selectWork').title('My Work'),
      S.divider(),
      ...S.documentTypeListItems().filter((item: any) => item.getId() !== 'selectWork'),
    ])
