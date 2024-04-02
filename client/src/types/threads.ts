export type Thread = {
    createdOn: string;
    noOfReplies: number;
    threadId: number;
    leader: string;
    title: string;
    message: string;
};

export type ThreadFormData = {
    title: string;
    message: string
}

export type ThreadCardProps = {
    thread: Thread;
};
