// import TerminusClient from '@terminusdb/terminusdb-client'
const TerminusClient = require("@terminusdb/terminusdb-client")

const user = process.env.TERMINUSDB_USER
const organization = process.env.TERMINUSDB_ORGANIZATION
const token = process.env.TERMINUSDB_ACCESS_TOKEN

// Assign your key to environment variable TERMINUSDB_ACCESS_TOKEN
const client = new TerminusClient.WOQLClient(`https://cloud.terminusdb.com/${organization}`, {
  user,
  organization,
  token
})

const schema = {
  "@type": "Class",
  "@id": "Book",
  "@key": { "@type": "Lexical", "@fields": ["name"] },
  name: "xsd:string",
  content: "sys:JSON"
};

async function getSchema() {
  client.db("books_test")
  const schema = await client.getSchema()
  console.log(schema);
}

const addSchema = async () => {
  const result = await client.addDocument(schema, { graph_type: "schema" });
  console.log("the schema has been created", result)
}

const addDocs = async (objects = []) => {
  if (!token) {
    console.warn('No TerminusDB token');
    return
  }
  const result = await client.addDocument(objects);
  console.log("the documents have been added", result)
}

const getDoc = (id) => {
  if (!token) {
    console.warn('No TerminusDB token');
    return {}
  }
  return client.getDocument({ id });
}

const updateDocs = async (docs) => {
  if (!token) {
    console.warn('No TerminusDB token');
    return
  }
  const result = await client.updateDocument(docs);
  console.log("updated document", result)
}



// getSchema()
// addSchema()

module.exports = {
  addSchema,
  getSchema,
  addDocs,
  getDoc,
  updateDocs,
}