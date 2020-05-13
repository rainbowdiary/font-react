import React, { Fragment, Suspense } from 'react';
// import A from "./components/A"
const A = React.lazy(() => import("./components/A"))

function App() {
  return (
    <Suspense className="App" fallback={<div>loading</div>}>
      <A />
    </Suspense>
  );
}

export default App;
