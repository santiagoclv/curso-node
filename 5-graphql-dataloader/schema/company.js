module.exports = `

    type Query {
        company: Info
    }

    type Info {
        name: String
        founder: String
        founded: Int
        ceo: String
        coo: String
        cto: String
        cto_propulsion: String
        employees: Int
        valuation: Float
        summary: String
        headquarters: Address
        links: InfoLinks
    }

    type InfoLinks {
        elon_twitter: String
        flickr: String
        twitter: String
        website: String
    }

    type Address {
        address: String
        city: String
        state: String
    }

`