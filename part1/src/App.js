const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}
const App = () => {
  console.log("Hello from component");

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="George" />
    </div>
  );
};

export default App;
