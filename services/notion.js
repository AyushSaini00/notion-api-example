const dotenv = require('dotenv').config();
const {Client} = require('@notionhq/client')

const notion = new Client({
    auth: process.env.NOTION_INTEGRATION_TOKEN
})

const database_id = process.env.DATABASE_ID;

module.exports = async function getDatabase() {
    const payload = {
        path: `databases/${database_id}/query`,
        method: 'POST'
    }
    const {results} = await notion.request(payload)

    const pages = results.map(page => {
        console.log(page.properties.Tags.multi_select)

        return {
            id: page.id,
            title: page.properties.Name.title[0].text.content,
            tags: page.properties.Tags.multi_select, //array of objects - id, name, color
            liveURL: page.properties['Live URL'].url,
            status: page.properties.Status.select,  //array of objects - id, name, color
            startedOn: page.properties['Started On'].date.start
        }
    })

    return pages;
}
