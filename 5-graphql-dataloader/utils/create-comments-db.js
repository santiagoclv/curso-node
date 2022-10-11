const { CommentRepository } = require('../datasources/comments');

const main = async () => {
    const commentRepository =  new CommentRepository();
    await commentRepository.createTable();
}

main();
