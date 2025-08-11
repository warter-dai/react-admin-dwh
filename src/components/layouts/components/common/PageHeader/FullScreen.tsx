import { FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useFullscreen } from "ahooks";

const FullScreen = () => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body);
  return (
    <span onClick={toggleFullscreen} className="cursor-pointer">
      {isFullscreen ? (
        <FullscreenExitOutlined style={{ fontSize: 18 }} />
      ) : (
        <FullscreenOutlined style={{ fontSize: 18 }} />
      )}
    </span>
  );
};

export default FullScreen;
