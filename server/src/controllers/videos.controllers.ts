import fs from 'fs';
import path from 'path';
import { Request, Response } from "express";
import { streamsData } from "../lib/constants";

const getVideosMetadata = (_req: Request, res: Response) => {
    res.json(streamsData);
}

const getPerticularVideoMetadata = (req: Request, res: Response) => {
    const { id } = req.params;
    const videoMetaData = streamsData.find(metaData => metaData.id === +id);

    if (videoMetaData) {
        return res.json(videoMetaData);
    }

    res.status(404).json({ error: 'video metadata not found' });
}

const getVideoStream = (req: Request, res: Response) => {
    const { id } = req.params;

    const dirPath = path.join(process.cwd(), 'src/assets');
    const videoFiles = fs.readdirSync(dirPath).map(file => file.replace('\.mp4', ''));

    if (!videoFiles.includes(id)) {
        return res.status(404).json({ error: 'Video doesn\'t exist' });
    }

    const videoPath = path.join(dirPath, `${id}.mp4`);
    const videoStats = fs.statSync(videoPath);
    const fileSize = videoStats.size;
    const videoRange = req.headers.range;

    if (videoRange) {
        const parts = videoRange.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);

        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize - 1;

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });

        const header = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, header);
        file.pipe(res);
    } else {
        const header = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, header);
        fs.createReadStream(videoPath).pipe(res);
    }
}

export {
    getVideosMetadata,
    getPerticularVideoMetadata,
    getVideoStream
};
