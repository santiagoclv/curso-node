module.exports = `
  type Mutation {
    addComment(launch_id: ID!, comment: CommentInput!): Comment
  }

  type Query {
    launches: [Launch]
    launch(id: ID!): Launch
    comments(launch_id: ID!): [Comment]
  }

  input CommentInput {
    user_name: String!
    message: String!
  }

  type Comment {
    user_name: String!
    message: String!
    launch: Launch
  }

  type History {
    flight: Launch
  }
  type LaunchesPastResult {
    result: Result
    data: [Launch]
  }
  type Launch {
    id: ID
    name: String
    flight_number: Int
    success: Boolean
    date_utc: String
    date_unix: Int
    details: String
    links: LaunchLinks
    rocket: Rocket
    is_tentative: Boolean
    upcoming: Boolean
    cores: [Core]
    comments: [Comment]
  }

  type LaunchLinks {
    flickr:flickrLinks
    presskit: String
    webcast: String
    youtube_id: String
    article: String
    wikipedia: String
  }

  type flickrLinks{
    original: [String]
  }

  type Core {
    core: String
    flight: Int
    gridfins: Boolean
    legs: Boolean
    reused: Boolean
    landing_attempt: Boolean
    landing_success: Boolean
    landing_type: String
    landpad: String
  }

`