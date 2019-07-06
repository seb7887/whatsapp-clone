export interface IMessage {
  id: number;
  content: string;
  createdAt: Date;
}

export interface IChats {
  id: number;
  name: string;
  picture: string;
  lastMessage: IMessage;
}
