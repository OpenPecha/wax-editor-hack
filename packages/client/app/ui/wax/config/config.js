import { emDash, ellipsis } from 'prosemirror-inputrules'

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
  YjsService,
  ExternalAPIContentService,
} from 'wax-prosemirror-services'

import { EditoriaSchema } from 'wax-prosemirror-core'

import CharactersList from './characterList'

const CHATGPT_URL = process.env.CHATGPT_URL;
const CHATGPT_KEY = process.env.CHATGPT_KEY;

async function ExternalAPIContentTransformation(prompt) {
  const response = await fetch(CHATGPT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${CHATGPT_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0,
      // max_tokens: 400,
      // n: 1,
      // stop: null,
    }),
  });

  try {
    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content;
  } catch (e) {
    console.error(e);
    alert(
      'That model is currently overloaded with other requests. You can retry your request.',
    );
  } finally {
  }
  return prompt;
}


const config = docIdentifier => ({
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
    ExternalAPIContentTransformation: ExternalAPIContentTransformation,
  },
  SchemaService: EditoriaSchema,
  TitleService: { updateTitle: () => {} },
  SpecialCharactersService: CharactersList,
  RulesService: [emDash, ellipsis],
  ShortCutsService: {},
  YjsService: {
    connectionUrl: process.env.CLIENT_WEBSOCKET_URL,
    docIdentifier,
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
