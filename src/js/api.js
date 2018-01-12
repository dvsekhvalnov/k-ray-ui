export const __API__ = process.env.NODE_ENV === "production"
    ? "/"
    : "http://localhost:8080/"

export const SEARCH_URL = __API__ + "events";
export const EXPORT_MSG_URL = (topic, partition, offset) =>  `${__API__}topics/${topic}/partitions/${partition}/offset/${offset}/download`;
