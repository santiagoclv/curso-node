module.exports = {
    sign(payload) {
        return JSON.stringify(payload)
    },
    verify(payload) {
        return JSON.parse(payload);
    }
}