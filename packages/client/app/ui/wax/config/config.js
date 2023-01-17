
import { emDash, ellipsis } from 'prosemirror-inputrules';

import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  BaseService,
  BaseToolGroupService,
  CommentsService,
  TrackChangeService,
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
} from 'wax-prosemirror-services';

import { EditoriaSchema } from 'wax-prosemirror-core';

import CharactersList from './characterList'

const config = docIdentifier => ({
  MenuService: [
    {
      templateArea: 'mainMenuToolBar',
      toolGroups: [
        {
          name: 'Base',
          exclude: [
            'Save'
          ]
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
          ]
        },
        {
          name: 'Annotations',
          more: [
            'Superscript',
            'Subscript',
            'SmallCaps',
          ],
          exclude: ['Code']
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
  SchemaService: EditoriaSchema,
  TitleService: { updateTitle: () => {}, },
  SpecialCharactersService: CharactersList,
  RulesService: [emDash, ellipsis],
  ShortCutsService: {},
  YjsService: {
   // eslint-disable-next-line no-restricted-globals
   connectionUrl: `ws://${location.hostname}:3000`,
   docIdentifier
  },
  services: [
    new YjsService(),
    new BaseToolGroupService(),
    new BaseService(),
    new BlockDropDownToolGroupService(),
    new TrackChangeService(),
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
});


export default config
