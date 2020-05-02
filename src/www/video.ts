import ytdl from "ytdl-core";
import React from "react";

export type Video = ytdl.videoInfo;

export async function fetchVideo(video: string): Promise<Video> {
  const response = await fetch(`/api/video/${encodeURIComponent(video)}/info`);
  return response.json();
}

export function useVideos(): [Video[], React.Dispatch<React.SetStateAction<Video[]>>] {
  const [videos, setVideos] = React.useState(initialState());

  React.useEffect(() => void localStorage.setItem('videos', JSON.stringify(videos)), [videos]);

  return [videos, setVideos];
}

function initialState(): Video[] {
  const persisted = localStorage.getItem('videos') ?? '[]';
  return JSON.parse(persisted);
}
