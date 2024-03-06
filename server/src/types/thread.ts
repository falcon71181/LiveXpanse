type ThreadInfo = {
  threadId: number;
  leader: string;
  title: string;
  message: string;
  noOfReplies: number;
}

type Reply = {
  parentReplyId: number | null;
  replyId: number;
  leader: string;
  message: string;
}

type SingleThreadInfo = ThreadInfo & { replies: Reply[] }

export { ThreadInfo, Reply, SingleThreadInfo };
