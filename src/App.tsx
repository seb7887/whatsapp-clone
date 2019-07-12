import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  RouteComponentProps
} from 'react-router-dom';
import ChatListScreen from './components/ChatListScreen';
import ChatRoomScreen from './components/ChatRoomScreen';

const redirectToChats = () => <Redirect to="/chats" />;
const matchComponent = ({ match }: RouteComponentProps<{ chatId: string }>) => (
  <ChatRoomScreen chatId={match.params.chatId} />
);

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/chats" component={ChatListScreen} />
      <Route exact path="/chats/:chatId" component={matchComponent} />
    </Switch>
    <Route exact path="/" component={redirectToChats} />
  </Router>
);

export default App;
