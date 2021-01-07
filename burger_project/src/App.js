import React from "react";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

function App() {
  // const [state, setState] = useState({ builderState: true });
  // setTimeout(() => {
  //   setState({ builderState: false });
  // }, 5000);
  return (
    <div>
      {/* <Layout>{state.builderState ? <BurgerBuilder /> : null}</Layout> */}
      <Layout>
        <BurgerBuilder />
      </Layout>
    </div>
  );
}

export default App;
