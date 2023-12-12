"use client";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import TopCardUi from "/src/components/cards/TopCardUi.jsx";
import VideoListCardUi from "/src/components/cards/VideoListCardUi.jsx";
import { useState, useEffect, useContext } from "react";
import { api } from "/src/utils/apibase";
import { FaRegEnvelope, FaReddit } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";
import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { IoLogoWhatsapp, IoIosLink } from "react-icons/io";
import FilterVideoSelectors from "/src/components/FilterVideoSelectors.jsx";
import { toast } from "react-toastify";
import { ClipFilterContext } from "/src/contextapi/ClipFilterProvider.jsx";
export default function InitPrompt() {
  return (
    <>
      <AllViews />
    </>
  );
}

const AllViews = () => {
  const { filterData, dispatchFilterData } = useContext(ClipFilterContext);
  const [videoClipListList, setVideoClipListList] = useState({
    page: 1,
    pages: 1,
    videoClipLists: null,
  });
  const [filteredVideoClipListList, setFilteredVideoClipListList] = useState({
    page: 1,
    pages: 1,
    videoClipLists: null,
  });

  const [currentVideoLink, setCurrentVideoLink] = useState(null);
  const [nextLink, setNextLink] = useState(null);
  const [listLoading, setListLoading] = useState(false);
  const [expandBottomSection, setExpandBottomSection] = useState(true);
  const [shareTooltipStatus, setShareTooltipStatus] = useState(false);
  const getvideoClipListsList = async (page = 1) => {
    const config = {
      method: "GET",
      url: "api/videoClipList",
      params: {
        pageNumber: page,
      },
    };
    setListLoading(true);
    try {
      const response = await api.request(config);
      if(response.data.videoClipLists.length > 3 ){
        response.data.videoClipLists.length =  3 
      }
      setVideoClipListList(response.data);
      setListLoading(false);
    } catch (error) {
      console.log(error);
      setListLoading(false);
      if (error.response.status == 401) {
        toast.error(error.response.data.message + ", Login to try again.", {
          position: "top-center",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    }
  };
  const getFilteredVideoClipListsList = async (page = 1) => {
    const config = {
      method: "GET",
      url: "api/videoClipList",
      params: {
        pageNumber: page,
        careerStage: filterData?.careerStage
          ? JSON.stringify(filterData?.careerStage)
          : null,
        fieldOfResearch: filterData?.fieldOfResearch
          ? JSON.stringify(filterData?.fieldOfResearch)
          : null,
        institutionSelector: filterData?.institutionSelector
          ? JSON.stringify(filterData?.institutionSelector)
          : null,
        rigorTopic: filterData?.rigorTopic
          ? JSON.stringify(filterData?.rigorTopic)
          : null,
      },
    };
    setListLoading(true);
    try {
      const response = await api.request(config);
      setFilteredVideoClipListList(response.data);
      // console.log(response.data);
      setListLoading(false);
    } catch (error) {
      console.log(error);
      setListLoading(false);
      if (error.response.status == 401) {
        toast.error(error.response.data.message + ", Login to try again.", {
          position: "top-center",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    }
  };
  function toggleExpandBottomSection() {
    setExpandBottomSection(!expandBottomSection);
    if (expandBottomSection) {
      console.log("opening expand section");
      console.log("get filtered videos");
      getFilteredVideoClipListsList();
    }
  }
  function copyToClipBoard(value) {
    // Copy the text inside the text field
    navigator.clipboard.writeText(value);
    toast("Link copied: " + value, {
      position: "top-center",
    });
  }

  function getTrimedReview(str, len = 110) {
    return { content: `${str.slice(0, len)} `, isTrimed: str.length > len };
  }
  useEffect(() => {
    if (!videoClipListList.videoClipLists) {
      getvideoClipListsList();
    }
  });
  useEffect(() => {
    getFilteredVideoClipListsList();
  }, [filterData]);
  return (
    <div className="bg-black">
      <TopCardUi />
      {/* <div className="text-white">{JSON.stringify(filterData)}</div> */}
      {!currentVideoLink && !nextLink && (
        <div className="mx-3 p-1 pb-0 border-x-2 space-y-2 border-ui-violet rounded-lg">
          <div
            className={`space-y-2 px-4 pt-4 ${
              expandBottomSection ? " pb-4" : ""
            }`}
          >
            {videoClipListList.videoClipLists?.map((e, index) => (
              <div key={index}>
                <VideoListCardUi
                  info={e}
                  right={index % 2 !== 0}
                  setvideoLink={setCurrentVideoLink}
                />
              </div>
            ))}
          </div>
          {!expandBottomSection ? (
            <div
              className={`space-y-2  pb-4 ${
                expandBottomSection ? "h-0 overflow-x-hidden" : "py-2"
              }`}
            >
              <div className=" mx-4 pb-3">
                <FilterVideoSelectors />
              <hr className="border-ui-violet mt-4  px-4" />
              </div>
              <div
                className={`space-y-2 ps-4 pe-1 min-h-[80px] ${filteredVideoClipListList.videoClipLists.length > 3?'overflow-y-scroll me-1  max-h-[360px]':'me-3'}`}
              >
                {filteredVideoClipListList.videoClipLists?.map((e, index) => (
                  <div key={index}>
                    <VideoListCardUi
                      info={e}
                      right={index % 2 !== 0}
                      setvideoLink={setCurrentVideoLink}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
      {currentVideoLink && !nextLink && (
        <div className="mx-3 p-3 ">
          <div className="w-full flex justify-center">
            <iframe
              width="713"
              height="405"
              src={`https://www.youtube.com/embed/${currentVideoLink?.videoLink}?rel=0`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          {!shareTooltipStatus ? (
            <div className="relative flex justify-between text-[16px] font-bold mt-2 text-white">
              <button
                className="px-14 py-3 bg-ui-violet rounded-sm"
                onClick={() => setCurrentVideoLink(null)}
              >
                Back to Recommendations
              </button>
              <button
                className="px-14 py-3 bg-purple-400/80 rounded-sm"
                onClick={() => setShareTooltipStatus(true)}
              >
                Share Video
              </button>

              <a
                className="px-14 py-3 bg-orange-400 rounded-sm"
                target="_blank"
                href={`${currentVideoLink?.nextLink}`}
              >
                Next
              </a>
            </div>
          ) : (
            <div
              className="flex justify-center mt-5"
              onClick={() => setShareTooltipStatus(false)}
            >
              <div className="space-x-5 text-2xl flex text-white">
                <a
                  className="p-2 bg-gray-700 hover:bg-gray-500 rounded-full"
                  target="_blank"
                  href={`https://twitter.com/intent/tweet?text=https://youtu.be/${currentVideoLink.videoLink}`}
                >
                  <RiTwitterXFill />
                </a>
                <a
                  className="p-2 bg-gray-700 hover:bg-gray-500 rounded-full"
                  target="_blank"
                  href={`http://www.reddit.com/submit?url=https://youtu.be/${currentVideoLink.videoLink}`}
                >
                  <FaReddit />
                </a>
                <a
                  className="p-2 bg-gray-700 hover:bg-gray-500 rounded-full"
                  target="_blank"
                  href={`whatsapp://send?text=https://youtu.be/${currentVideoLink.videoLink}`}
                >
                  <IoLogoWhatsapp />
                </a>
                <a
                  className="p-2 bg-gray-700 hover:bg-gray-500 rounded-full"
                  target="_blank"
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://youtu.be/${currentVideoLink.videoLink}`}
                >
                  <BsFacebook />
                </a>
                <a
                  className="p-2 bg-gray-700 hover:bg-gray-500 rounded-full"
                  target="_blank"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://youtu.be/${currentVideoLink.videoLink}`}
                >
                  <AiFillLinkedin />
                </a>
                <button
                  className="p-2 bg-gray-700 hover:bg-gray-500 rounded-full"
                  onClick={() =>
                    copyToClipBoard(
                      `https://youtu.be/${currentVideoLink.videoLink}`
                    )
                  }
                >
                  <IoIosLink />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* expansion btn */}
      {!currentVideoLink && !nextLink && (
        <div className="mx-6 ">
          <button
            className="px-2 w-full flex justify-between items-center bg-ui-violet text-white"
            onClick={() => toggleExpandBottomSection()}
          >
            <div className="w-[30px] flex justify-center text-lg">
              {expandBottomSection ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowUp />
              )}
            </div>
            <p className="text-center text-[10px]">
              {expandBottomSection
                ? "Don't like our recs? Click to see all clips."
                : "Collapse clip repository"}
            </p>
            <div className="w-[30px] flex justify-center text-lg">
              {expandBottomSection ? (
                <MdKeyboardArrowDown />
              ) : (
                <MdKeyboardArrowUp />
              )}
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
