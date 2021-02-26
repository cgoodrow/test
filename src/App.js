import React from 'react';
import {Route, Switch} from 'react-router-dom';
import StandardTemplate from 'components/dnd-builder/standard';
import PurchaseOrder from 'components/materials/purchase/purchase-order';
import Layout from 'components/layout';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path='/standard' exact={true} component={StandardTemplate} />
        <Route path='/purchase-order' exact={true} component={PurchaseOrder} />
      </Switch>
    </Layout>
    );
}

export default App;
