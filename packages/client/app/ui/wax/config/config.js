
import { emDash, ellipsis } from 'prosemirror-inputrules';

import {
  InlineAnnotationsService,
  AnnotationToolGroupService,
  BaseService,
  BaseToolGroupService,
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
} from 'wax-prosemirror-services';

import { EditoriaSchema } from 'wax-prosemirror-core';

import YjService from '../yjsService/yjsService'

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
            'Underline',
            'StrikeThrough',
          ],
          exclude: ['Code']
        },
        'HighlightToolGroup',
        'TransformToolGroup',
        'Lists',
        'Images',
        'SpecialCharacters',
        'Tables',
        'FullScreen'
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
    new YjService(),
    new BaseToolGroupService(),
    new BaseService(),
    new BlockDropDownToolGroupService(),
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
