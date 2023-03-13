import {RangeInput} from '../components/RangeInput'
import {defineType, defineField} from 'sanity'

// schemas/projects.ts
export default {
  name: 'project',
  type: 'document',
  title: 'Project Index',
  groups: [
    {
      name: 'homepage',
      title: 'Homepage',
    },
    {
      name: 'copy',
      title: 'Copy',
    },
    {
      name: 'visual',
      title: 'Visual',
    },
  ],
  initialValue: {
    theme: 'dark',
    gridColumns: {
      start: 1,
      end: 13,
    },
  },
  fields: [
    {
      name: 'title',
      title: 'Project',
      type: 'string',
      description:
        'Title your project. This displays on its cards and will be used as the slug for your project page.',
      group: ['copy', 'homepage'],
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
      group: ['visual', 'homepage'],
    },
    {
      name: 'gridColumns',
      title: 'Layout Columns',
      type: 'object',
      group: 'homepage',
      options: {
        columns: 2,
      },
      description:
        'Choose how far you want the card to span across the grid. This does not show the final aspect-ratio or height.',
      fields: [
        {
          name: 'start',
          title: 'Starting Column',
          type: 'number',
          // components: {
          //   input: RangeInput,
          // },
          validation: (Rule: any) => Rule.required().min(1).max(9).integer(),
        },

        {
          name: 'end',
          title: 'Ending Column',
          type: 'number',
          validation: (Rule: any) => Rule.required().min(5).max(13).integer(),
        },
      ],
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
      group: ['copy', 'homepage'],
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      group: ['copy', 'visual'],
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
            },
          ],
        },
      ],
    },
  ],
}
