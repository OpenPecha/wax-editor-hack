// const BaseModel = require('@pubsweet/base-model')

// const { string, stringNotEmpty } = require('../_helpers/types')

// class ServiceCredential extends BaseModel {
//   constructor(properties) {
//     super(properties)
//     this.type = 'serviceCredential'
//   }

//   static get tableName() {
//     return 'serviceCredentials'
//   }

//   static get schema() {
//     return {
//       type: 'object',
//       required: ['name'],
//       properties: {
//         name: stringNotEmpty,
//         accessToken: string,
//       },
//     }
//   }
// }

// module.exports = ServiceCredential