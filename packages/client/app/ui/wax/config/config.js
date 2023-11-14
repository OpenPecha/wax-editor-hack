/* eslint-disable no-restricted-globals */

import { emDash, ellipsis } from 'prosemirror-inputrules';

import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  BaseService,
  BaseToolGroupService,
  CommentsService,
  ImageService,
  ImageToolGroupService,
  LinkService,
  ListsService,
  ListToolGroupService,
  TablesService,
  TableToolGroupService,
  DisplayBlockLevelService,
  DisplayToolGroupService,
  TextBlockLevelService,
  TextToolGroupService,
  DisplayTextToolGroupService,
  MathService,
  FindAndReplaceToolGroupService,
  FindAndReplaceService,
  FullScreenService,
  FullScreenToolGroupService,
  SpecialCharactersService,
  SpecialCharactersToolGroupService,
  HighlightService,
  TextHighlightToolGroupServices,
  EditorInfoToolGroupServices,
  BottomInfoService,
  TransformService,
  TransformToolGroupService,
  CustomTagBlockToolGroupService,
  CustomTagService,
  BlockDropDownToolGroupService,
  // YjsService,
  ExternalAPIContentService,
} from 'wax-prosemirror-services'

import { EditoriaSchema } from 'wax-prosemirror-core'

import CharactersList from './characterList'

import YjsService from './yjsService';

const { SERVER_URL  } = process.env;

async function ExternalAPIContentTransformation(prompt) {
  try {
    const response = await fetch(`${SERVER_URL}/api/askChatGpt`, {
      method: 'POST',
      body: new URLSearchParams({ prompt }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      } 
    });

    return  await response.text()
  } catch (e) {
    console.error(e);
    // eslint-disable-next-line no-alert
    alert(
      'That model is currently overloaded with other requests. You can retry your request.',
    );
  } finally { /* empty */ }

  return prompt;
}

const config = (yjsProvider, ydoc) => ({
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        {
          name: 'Base',
          exclude: ['Save'],
        },
        {
          name: 'BlockDropDown',
          exclude: [
            'Author',
            'SubTitle',
            'EpigraphProse',
            'EpigraphPoetry',
            'Heading4',
            'ParagraphContinued',
            'ExtractProse',
            'SourceNote',
          ],
        },
        {
          name: 'Annotations',
          more: ['Superscript', 'Subscript', 'SmallCaps'],
          exclude: ['Code'],
        },
        'HighlightToolGroup',
        'TransformToolGroup',
        'Lists',
        'Images',
        'SpecialCharacters',
        'Tables',
        'ExternalAPIContent',
        'FindAndReplaceTool',
        'FullScreen',
      ],
    },
    {
      templateArea: 'leftSideBar',
      toolGroups: ['DisplayText'],
    },
    {
      templateArea: 'BottomRightInfo',
      toolGroups: ['InfoToolGroup'],
    },
  ],
  ExternalAPIContentService: {
    ExternalAPIContentTransformation,
  },
  SchemaService: EditoriaSchema,
  TitleService: { updateTitle: () => {} },
  SpecialCharactersService: CharactersList,
  RulesService: [emDash, ellipsis],
  ShortCutsService: {},
  YjsService: {
    provider: () => {
      return yjsProvider
    },
    ydoc: () => {
      return ydoc
    },
    cursorBuilder: (user) => {
      const cursor = document.createElement('span')
      cursor.classList.add('ProseMirror-yjs-cursor')
      cursor.setAttribute('style', `border-color: ${user.color}`)
      const userDiv = document.createElement('div')
      userDiv.setAttribute('style', `background-color: ${user.color}`)
      userDiv.insertBefore(document.createTextNode(user.name), null)
      cursor.insertBefore(userDiv, null)
      return cursor
    }
  },

  services: [
    new ExternalAPIContentService(),
    new YjsService(),
    new BaseToolGroupService(),
    new BaseService(),
    new BlockDropDownToolGroupService(),
    new CommentsService(),
    new DisplayBlockLevelService(),
    new DisplayToolGroupService(),
    new TextBlockLevelService(),
    new TextToolGroupService(),
    new ListsService(),
    new LinkService(),
    new InlineAnnotationsService(),
    new ImageService(),
    new TablesService(),
    new TableToolGroupService(),
    new ImageToolGroupService(),
    new AnnotationToolGroupService(),
    new ListToolGroupService(),
    new DisplayTextToolGroupService(),
    new MathService(),
    new FindAndReplaceToolGroupService(),
    new FindAndReplaceService(),
    new FullScreenService(),
    new FullScreenToolGroupService(),
    new SpecialCharactersService(),
    new SpecialCharactersToolGroupService(),
    new HighlightService(),
    new TextHighlightToolGroupServices(),
    new EditorInfoToolGroupServices(),
    new BottomInfoService(),
    new TransformService(),
    new TransformToolGroupService(),
    new CustomTagBlockToolGroupService(),
    new CustomTagService(),
  ],
})

export default config
