import React from "react";
import Image from "next/image";
// import './image360.css';

const pixelsPerDegree = 4;

interface Image360Props {
  images: string[];
  onPopupCancel: () => void;
}

const Image360: React.FunctionComponent<Image360Props> = (
  props: Image360Props
) => {
  const [dragging, setDragging] = React.useState(false);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [dragStartIndex, setDragStartIndex] = React.useState(0);
  const [dragStart, setDragStart] = React.useState(0);

  React.useEffect(() => {
    // document.addEventListener('mousemove', handleMouseMove, false);
    // document.addEventListener('mouseup', handleMouseUp, false);
    return () => {
      //   document.removeEventListener('mousemove', handleMouseMove, false);
      //   document.removeEventListener('mouseup', handleMouseUp, false);
    };
  }, []);

  const handleMouseDown = (e: any) => {
    e.persist();
    setDragging(true);
    setDragStart(e.screenX);
    setDragStartIndex(imageIndex);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const updateImageIndex = (currentPosition: number) => {
    const numImages = props.images.length;
    const pixelsPerImage = pixelsPerDegree * (360 / numImages);
    // pixels moved
    const dx = (currentPosition - dragStart) / pixelsPerImage;
    let index = Math.floor(dx) % numImages;

    if (index < 0) {
      index = numImages + index - 1;
    }
    index = (index + dragStartIndex) % numImages;
    if (index !== imageIndex) {
      setImageIndex(index);
    }
  };

  const handleMouseMove = (e: any) => {
    if (dragging) {
      updateImageIndex(e.screenX);
    }
  };

  const preventDragHandler = (e: any) => {
    e.preventDefault();
  };

  const handleRightClick = () => {
    setDragging(false);
  };

  const renderImage = () => {
    const image = props.images[imageIndex];
    return (
      <div className="image-360">
        {image && (
          <Image
            alt="image-360"
            src={image}
            className="img-fluid view-area-height"
            width={1600}
            height={900}
          />
        )}
      </div>
    );
  };

  return (
    <>
      {/* <code>
        {JSON.stringify({ dragging, imageIndex, dragStartIndex, dragStart })}
      </code> */}
      <div
        className="modal fade px-0 compare-popup show"
        id="compareModal"
        tabIndex={-1}
        style={{ display: "block" }}
        //   aria-labelledby="compareModalLabel"
        //   aria-hidden="true"
      >
        <div className="modal-dialog m-0 h-100">
          <div className="modal-content rounded-0 h-100 overflow-auto">
            <div className="modal-body p-0">
              <button
                type="button"
                className="position-absolute right-0 top-0 zIndex-1 font-sm bg-gray-200 rounded-circle border-0 p-3 m-3 d-lg-inline-block d-none"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => props.onPopupCancel()}
              >
                <i className="icon-close text-muted"></i>
              </button>
              <div className="w-100 col-md-11 col-12 mx-auto"></div>
              <div
                className="image-360-holder"
                onMouseUp={() => handleMouseUp()}
                onMouseMove={(e: any) => handleMouseMove(e)}
                onMouseDown={(e: any) => handleMouseDown(e)}
                onDragStart={(e: any) => preventDragHandler(e)}
                onContextMenu={() => handleRightClick()}
              >
                {renderImage()}
              </div>
            </div>
          </div>
        </div>
        <span className="drag-label">Drag to rotate</span>
      </div>
    </>
  );
};

export default Image360;
