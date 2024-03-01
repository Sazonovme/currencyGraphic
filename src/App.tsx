import { WidgetGraphic } from './components';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

function App() {
  return (
    <Theme preset={presetGpnDefault}>
      <WidgetGraphic />
    </Theme>
  );
}

export default App;
