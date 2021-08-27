import Canvas from './Canvas'
function App() {
  return (
    <>
      <h1>Use arrow keys to start!</h1>
      <Canvas width="1600" height="1000" />
      <button className="button-clear">Clear!</button>
    </>
  );
}

export default App;