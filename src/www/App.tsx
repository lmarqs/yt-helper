
import React from "react";
import { useVideos, fetchVideo } from "./video";
import { Form, useOnSubmitCallback } from "./Form";
import { Navbar } from "./Navbar";
import { List } from "./List";

export const App: React.FunctionComponent = () => {
  const [videos, setVideos] = useVideos();

  const onSubmit = useOnSubmitCallback(async (values) => {
    const video = await fetchVideo(values.url);

    setVideos([video, ...videos.filter(v => v.videoDetails.videoId !== video.videoDetails.videoId)].slice(0, 10));
  });

  return (
    <div className="container px-0">
      <Navbar>
        <Form onSubmit={onSubmit} />
      </Navbar>
      <List videos={videos} />
    </div>
  )
}
