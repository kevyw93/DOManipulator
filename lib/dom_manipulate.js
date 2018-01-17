const updateTodo = (e) => {
  e.preventDefault();
  // debugger
  // $k('.todo-lists').append(`
  //
  //     <input class="newTitle">Title</input>
  //     <button class="submit-again">Submit</button>
  //
  // `);
  // $k('.submit-again').on('click', submitTodoAgain)
  $k($k(e.target.parentNode).find('.real-title')[0]).html(`${$k('.title').nodeValues()}`)

  // `${$k('.title').nodeValues()}`

};
//
// const submitTodoAgain = (e) => {
//   e.preventDefault();
//   debugger
// }


const deleteTodo = (e) => {
  e.preventDefault();
  $k(e.target.parentNode).remove();
};

const onSubmit = (e) => {
  e.preventDefault();
  let title = $k('.title').nodeValues();
  // let description = $k('.description').nodeValues();
  $k('.todo-lists').append(`
    <div class="title-container">
      <h2 class="real-title">Title: ${title} </h2>
      <button class="edit">Edit</button>
      <h3 class="delete">Delete</h3>
    </div>
    `);
  // $k('.todo-lists').append(`<h3>Description: ${description}</h3>`);
  $k('.title').htmlValue('');
  // $k('.description').htmlValue('');
  $k('.edit').on('click', updateTodo)
  $k('.delete').on('click', deleteTodo)

};


$k('input').attr('type', 'text');

$k(() => $k('form').on('submit', onSubmit));
// $k(() => onSubmit(e));
