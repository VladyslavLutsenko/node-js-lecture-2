const {readAll, findOne, add, deleteById, updateById} = require('./books');

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

invokeAction({ action: 'readAll' });
// invokeAction({ action: 'findOne', id: 'ck89qe3HriUDHe09TBoJ8' });
// invokeAction({ action: 'add', title: 'Test', author: 'Luke Skywalker' });
// invokeAction({ action: 'deleteById', id: '640782f62693ad79b0275778' });
// invokeAction({ action: 'updateById', id: '640782c995c108797de0cd16', title: 'Test 32' });
