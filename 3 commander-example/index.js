const {readAll, findOne, add, deleteById, updateById} = require('./books');
const {program} = require('commander')

const invokeAction = async ({ action, id, title, author }) => {
  switch (action) {
    case 'readAll':
      const books = await readAll();
      console.log(books);
      break;
    case 'findOne':
      const book = await findOne(id);
      console.log(book);
      break;
    case 'add':
      await add({title, author});
      break;
    case 'deleteById':
      await deleteById(id);
      break;
    case 'updateById':
      await updateById({id, title, author});
      break;

    default:
      console.log('No such action!')
      break;
  }
}

program
  .option("-a, --action <type>", 'Action that we want to trigger')
  .option("-i, --id <bookId>")
  .option("-t, --title <title>")
  .option("-au, --author <author>")

program.parse(process.argv);

invokeAction(program.opts());
