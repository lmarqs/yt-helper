
import React from "react";
import { useVideos, fetchVideo } from "./video";
import { Form, useOnSubmitCallback } from "./Form";
import { Navbar } from "./Navbar";
import { List } from "./List";

export const App: React.FunctionComponent = () => {
  const [videos, setVideos] = useVideos();

  const onSubmit = useOnSubmitCallback(async (values) => {
    const url = new URL(values.url);
    const id = url.searchParams.get("v");

    if (!id) {
      alert('invalid URL');
      return;
    }

    const video = await fetchVideo(id);

    setVideos([video, ...videos.filter(v => v.video_id !== video.video_id)]);
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
