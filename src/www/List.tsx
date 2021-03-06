import React, { FunctionComponent, useState, useCallback } from "react";
import { Video } from "./video";

interface Props {
  videos: Video[];
}

export const List: FunctionComponent<Props> = ({ videos }) => {
  console.log(videos)
  return (
    <ul className="list-group">
      {videos.map(video => (
        <ListItem key={video.videoDetails.videoId} video={video} />
      ))}
    </ul>
  );
}

const ListItem: FunctionComponent<{ video: Video }> = ({ video }) => {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-10">
          {video.videoDetails.title}
        </div>
        <div className="col-2">
          <Actions video={video} />
        </div>
      </div>
    </li>
  );
}

const Actions: FunctionComponent<{ video: Video }> = ({ video }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const onBlur = useCallback((e) => {
    setTimeout(() => setIsFocused(false), 500);
  }, []);


  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <div className="dropdown dropleft" onBlur={onBlur} onFocus={onFocus}>
      <button
        aria-expanded={isFocused}
        aria-haspopup="true"
        className={`btn btn-link${isFocused ? ' show' : ''}`}
        data-toggle="dropdown"
        type="button"
      >
        <span className="material-icons">
          more_horiz
        </span>
      </button>
      <div className={`dropdown-menu${isFocused ? ' show' : ''}`}>
        <a className="dropdown-item" href={video.videoDetails.video_url} rel="noopener noreferrer" target="_blank">
          Assistir
        </a>
        <a 
          className="dropdown-item"
          href={`/api/video/${encodeURIComponent(video.videoDetails.video_url)}/download?name=${encodeURIComponent(video.videoDetails.title)}&ext=mp4`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Baixar Video
        </a>
        <a 
          className="dropdown-item"
          href={`/api/video/${encodeURIComponent(video.videoDetails.video_url)}/download?name=${encodeURIComponent(video.videoDetails.title)}&ext=mp3`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Baixar Audio
        </a>
      </div>
    </div>
  )
}
