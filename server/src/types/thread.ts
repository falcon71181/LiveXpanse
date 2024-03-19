type ThreadInfo = {
  createdOn: string,
  threadId: number;
  leader: string;
  title: string;
  message: string;
  noOfReplies: number;
}

type Reply = {
  createdOn: string,
  parentReplyId: number | null;
  replyId: number;
  leader: string;
  message: string;
}

type SingleThreadInfo = ThreadInfo & { replies: Reply[] }

export { ThreadInfo, Reply, SingleThreadInfo };
