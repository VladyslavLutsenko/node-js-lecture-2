const {readAll, findOne, add, deleteById, updateById} = require('./books');
const {hideBin} = require('yargs/helpers');
const yargs = require('yargs');

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

invokeAction(yargs(hideBin(process.argv)).argv);
