export interface IChatQueryMessage {
  id: string;
  content: string;
  createdAt: string;
}

export interface IChatQueryResult {
  id: string;
  name: string;
  picture: string;
  messages: IChatQueryMessage[];
}
