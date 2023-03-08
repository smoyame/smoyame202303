import {GridField} from '../components/GridField'
import {GridFieldArea} from '../components/GridFieldArea'
import {GridInput} from '../components/GridInput'

// schemas/projects.ts
export default {
  name: 'project',
  type: 'document',
  title: 'Project Index',
  groups: [
    {
      name: 'copy',
      title: 'Copy',
    },
    {
      name: 'media',
      title: 'Media',
    },
  ],
  initialValue: {
    theme: 'dark',
  },
  fields: [
    {
      name: 'gridColumn',
      title: 'Grid Columns',
      type: 'object',
      description:
        'Choose how far you want the card to span across the grid. This does not show the final aspect-ratio or height.',
      components: {
        field: GridField,
      },
      fields: [
        {
          name: 'gridStart',
          title: 'Grid Start',
          type: 'number',
          options: {
            list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          },
          components: {
            field: GridFieldArea,
            input: GridInput,
          },
        },
        {
          name: 'gridEnd',
          title: 'Grid End',
          type: 'number',
          options: {
            list: [5, 6, 7, 8, 9, 10, 11, 12, 13],
          },
          components: {
            field: GridFieldArea,
            input: GridInput,
          },
        },
      ],
    },
    //*
    //*  Finalized fields
    //*
    {
      name: 'title',
      title: 'Project',
      type: 'string',
      description:
        'Title your project. This displays on its cards and will be used as the slug for your project page.',
      group: 'copy',
    },
    {
      name: 'theme',
      title: 'Color Theme',
      type: 'string',
      options: {
        list: [
          {title: 'Dark', value: 'dark'},
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
      type: 'file',
      accept: ['png', 'mp4', 'gif', 'jpg', 'jpeg'],
      fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
      group: 'media',
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
          type: 'text',
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
      group: 'copy',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          name: 'media',
          title: 'Media Block',
          type: 'object',
          fields: [
            {
              name: 'item',
              title: 'Item',
              type: 'file',
              accept: ['png', 'mp4', 'gif', 'jpg', 'jpeg'],
              fields: [{name: 'alt', title: 'Alt Text', type: 'string'}],
              group: 'media',
            },
          ],
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
              group: 'copy',
            },
          ],
        },
      ],
    },
  ],
}
