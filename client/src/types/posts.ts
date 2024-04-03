export type PostInfo = {
  createdOn: string,
  threadId: number;
  leader: string;
  title: string;
  message: string;
  noOfReplies: number;
  replies?: Reply[];
}

type Reply = {
  createdOn: string,
  parentReplyId: number | null;
  replyId: number;
  leader: string;
  message: string;
}
