import { useState } from "react";

const VideoListCardUi = ({ right, info, setvideoLink }) => {
  function getTrimedReview(str, len = 170) {
    return { content: `${str.slice(0, len)} `, isTrimed: str.length > len };
  }
  const [isFullContent, setIsFullContent] = useState(false);
  return (
    <div
      className={`flex bg-[rgba(144,_123,_154,_0.38)] text-white rounded-lg ${
        right ? "flex-row-reverse" : ""
      }`}
    >
      <div
        className={`w-[123px] max-h-max flex justify-center items-center text-center rounded-lg border-black bg-white p-2 ${
          right ? "border-s-4" : "border-e-4"
        }`}
      >
        {info && info?.thumbnail ? (
          <img
            onClick={() => setvideoLink(info)}
            src={`${info?.thumbnail.data ?? '/imoje-charecters/sample-image.jpg'}`}
            width={123}
            height={123}
            alt={`${info?.videoTitle}`}
          />
        ) : (
          <h3 className="text-black font-bold">
            THUMB
            <br />
            NAIL
          </h3>
        )}
      </div>
      <div
        className={`w-[calc(100%_-_123px)] flex flex-col justify-between space-y-1 p-2 `}
      >
        <h3
          className="text-[16px]  font-bold"
          onClick={() => setvideoLink(info)}
        >
          {info?.videoTitle}
        </h3>
        <p className="text-[14px] leading-[18px]">
          {!isFullContent ? (
            <>
              <span className="">
                {getTrimedReview(info?.videoDetailsText).content}
              </span>
              <span
                className="text-ui-light-blue cursor-pointer"
                onClick={() => setIsFullContent(true)}
              >
                {getTrimedReview(info?.videoDetailsText).isTrimed
                  ? " Show More"
                  : ""}
              </span>
            </>
          ) : (
            <>
              <span className="">{info?.videoDetailsText}</span>
              <span
                className="text-ui-light-blue cursor-pointer"
                onClick={() => setIsFullContent(false)}
              >
                {" "}
                Show Less
              </span>
            </>
          )}
        </p>
        <p className="text-[10px] leading-[18px]"
        
      onClick={() => setvideoLink(info)}
        >
          <span className="font-bold">Keywords</span>: {info?.videoKeywords}
        </p>
      </div>
    </div>
  );
};

export default VideoListCardUi;
