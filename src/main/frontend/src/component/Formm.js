import Login from "../page/Login";

const LoginForm = () => {
  const handler = (event) => {
    event.preventDefault();
    console.log('login form');
  }
  return (
    <form onSubmit={handler}>
      <label htmlFor="">id</label>
      <input type="text"/>
      <label htmlFor="">password</label>
      <input type="password"/>
      <button type={"submit"}>클릭</button>
    </form>
  );
};

const BoardForm = () => {

  return (
    <form action="">
      <label htmlFor="">title</label>
      <input type="text"/>
      <label htmlFor="">content</label>
      <input type="text"/>
    </form>
  );
};

const Formm = (props) => {
  console.log(props.title);

  return (
    <>
      {props.title === "login" && <LoginForm />}
      {props.title === 'board' && <BoardForm />}
    </>
  )
}

export default Formm;