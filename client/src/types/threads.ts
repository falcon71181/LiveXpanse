export type Thread = {
  leader: string;
  title: string;
  message: string;
};

export type ThreadCardProps = {
  thread: Thread;
};
