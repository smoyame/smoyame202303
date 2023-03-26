// schemas/projects.ts
export default {
  name: 'project',
  type: 'document',
  title: 'Project Index',
  groups: [
    {
      name: 'home',
      title: 'Homepage',
    },
    {
      name: 'copy',
      title: 'Copy',
    },
    {
      name: 'assets',
      title: 'Assets',
    },
  ],
  initialValue: {
    theme: 'night',
    live: 'true',
  },
  fields: [
    {
      name: 'live',
      title: 'Go Live',
      type: 'boolean',
      description:
        'Is this project OK to have a live link on the homepage? If this is off, that project card will not link anywhere and display a locked icon.',
    },
    {
      name: 'title',
      title: 'Project',
      type: 'string',
      description:
        'Title your project. This displays on its cards and will be used as the slug for your project page.',
      group: ['copy', 'home'],
    },
    {
      name: 'theme',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Night', value: 'night'},
          {title: 'Bright', value: 'bright'},
          {title: 'Vibing', value: 'vibing'},
          {title: 'Alertness', value: 'alertness'},
          {title: 'Disfruta', value: 'disfruta'},
          {title: 'Zesty', value: 'zesty'},
          {title: 'Pensive', value: 'pensive'},
          {title: 'Poder', value: 'poder'},
        ],
      },
    },
    {
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
      group: ['assets', 'home'],
    },
    {
      name: 'info',
      title: 'Leading Info',
      type: 'object',
      fields: [
        {
          name: 'prompt',
          title: 'Prompt',
          type: 'string',
          description: 'The leading question, statement, or prompt that guided the project.',
        },
        {
          name: 'desc',
          title: 'Description',
          type: 'array',
          of: [{type: 'block'}],
          description:
            "A short summary that emphasizes the goal and what you accomplished along the way. Two to three paragraphs. Don't overwhelm them in the 5 seconds they'll read over it!",
        },
      ],
      group: 'copy',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
      group: ['copy', 'home'],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          name: 'mediaBlock',
          title: 'Media Block',
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item',
              type: 'image',
              fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
            },
            {
              name: 'grid',
              title: 'Image Placement',
              type: 'object',
              description:
                'Choose where across the 13 grid column seperators you want the project card to span.',
              fields: [
                {
                  name: 'start',
                  title: 'Start',
                  type: 'number',
                },
                {
                  name: 'end',
                  title: 'End',
                  type: 'number',
                },
              ],
            },
          ],
          preview: {
            select: {
              unqID: '_key',
              subtitle: 'item.alt',
              media: 'item.asset',
            },
            prepare(selection: any) {
              const {unqID} = selection

              return {
                ...selection,
                title: `ID: ${unqID}`,
              }
            },
          },
        },
        {
          name: 'textBlock',
          title: 'Text Block',
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Text',
              type: 'text',
            },
          ],
        },
      ],
    },
  ],
}
