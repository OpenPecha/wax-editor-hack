const { modelTypes, BaseModel } = require('@coko/server')
const { Team, TeamMember } = require('@pubsweet/models')
const config = require('config')
const TerminusDB = require('../../api/TerminusDB')

const AUTHOR_TEAM = config.teams.nonGlobal.author
const VIEWER_TEAM = config.teams.nonGlobal.viewer

const { stringNotEmpty, arrayOfObjectsNullable } = modelTypes

class Doc extends BaseModel {

  constructor(properties) {
    super(properties)
    this.type = 'doc'
  }

  static get tableName() {
    return 'docs'
  }

  static get schema() {
    return {
      type: 'object',
      properties: {
        identifier: stringNotEmpty,
        docs_prosemirror_delta: arrayOfObjectsNullable,
        docs_y_doc_state: {
          type: "binary",
        },
      },
    }
  }


  async addMemberAsViewer(userId) {
    const authorTeam = await Team.query().findOne({
      objectId: this.id,
      objectType: 'doc',
      role: AUTHOR_TEAM.role
    })

    const isAuthor = await TeamMember.query().findOne({
      teamId: authorTeam.id,
      userId
    })

    if (!isAuthor) {

      let viewerTeam = await Team.query().findOne({
        objectId: this.id,
        objectType: 'doc',
        role: VIEWER_TEAM.role
      })

      if (!viewerTeam) {
        viewerTeam = await Team.insert({
          objectId: this.id,
          objectType: 'doc',
          role: VIEWER_TEAM.role,
          displayName: VIEWER_TEAM.displayName,
        })

      }

      const isViewer = await TeamMember.query().findOne({
        teamId: viewerTeam.id,
        userId
      })

      if (!isViewer) {
        await Team.addMember(viewerTeam.id, userId)
      }

      return viewerTeam
    }

    return false
  }

  static async createDoc({ delta, state, identifier, userId }) {
    const doc = await Doc.query().insert({
      docs_prosemirror_delta: delta,
      docs_y_doc_state: state,
      identifier,
    }).returning('*')

    const authorTeam = await Team.insert(
      {
        objectId: doc.id,
        objectType: 'doc',
        role: AUTHOR_TEAM.role,
        displayName: AUTHOR_TEAM.displayName,
      }
    )

    await Team.addMember(authorTeam.id, userId)


    await TerminusDB.addDocs([{
      '@type': 'Book',
      name: doc.identifier,
      content: { editorContent: doc.docs_prosemirror_delta }
    }])

    return doc
  }
}

module.exports = Doc
