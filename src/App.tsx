import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  RouteComponentProps
} from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import ChatListScreen from './components/ChatListScreen';
import ChatRoomScreen from './components/ChatRoomScreen';

const redirectToChats = () => <Redirect to="/chats" />;
const matchComponent = ({ match }: RouteComponentProps<{ chatId: string }>) => (
  <ChatRoomScreen chatId={match.params.chatId} />
);

const glide = (val: number) =>
  spring(val, {
    stiffness: 174,
    damping: 24
  });

const mapStyles = (styles: any) => ({
  transform: `translateX(${styles.offset}%)`
});

const App: React.FC = () => (
  <Router>
    <AnimatedSwitch
      atEnter={{ offset: 100 }}
      atLeave={{ offset: glide(-100) }}
      atActive={{ offset: glide(0) }}
      mapStyles={mapStyles}
      className="switch-wrapper"
    >
      <Route exact path="/chats" component={ChatListScreen} />
      <Route exact path="/chats/:chatId" component={matchComponent} />
    </AnimatedSwitch>
    <Route exact path="/" component={redirectToChats} />
  </Router>
);

export default App;
