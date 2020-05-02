import React, { FunctionComponent, useState, useCallback } from "react";
import { Video } from "./video";

interface Props {
  videos: Video[];
}

export const List: FunctionComponent<Props> = ({ videos }) => {
  return (
    <ul className="list-group list-group-flush">
      {videos.map(video => (
        <ListItem key={video.video_id} video={video} />
      ))}
    </ul>
  );
}

const ListItem: FunctionComponent<{ video: Video }> = ({ video }) => {
  return (
    <li className="row px-2">
      <div className="col-10">
        {video.title}
      </div>
      <div className="col-2">
        <Actions video={video} />
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
    <div onBlur={onBlur} onFocus={onFocus}>
      <button
        aria-expanded={isFocused}
        aria-haspopup="true"
        className={`btn btn-link${isFocused ? ' show' : ''}`}
        data-toggle="dropdown"
        type="button"
      >
        <i className="mdi mdi-dots-horizontal font-weight-bold" />
      </button>
      <div className={`dropdown-menu${isFocused ? ' show' : ''}`}>
        <a className="dropdown-item" href={video.video_url} rel="noopener noreferrer" target="_blank">
          Assistir
          {' '}
          <i className="mdi mdi-youtube-play" />
        </a>
        <a className="dropdown-item" href={`/api/video/${video.video_id}/download?name=${encodeURIComponent(video.title)}`} rel="noopener noreferrer" target="_blank">
          Baixar
          {' '}
          <i className="mdi mdi-youtube-play" />
        </a>
      </div>
    </div>
  )
}
