import VideoPlayer from "../VideoPlayer";

const VideoModal = (props) => {
    const {videos} = props;
    const openVideo = () => {
        if (document.getElementById("defaultModal").classList.contains("hidden")) {
          document.getElementById("defaultModal").classList.remove("hidden");
          document.getElementById("defaultModal").classList.add("bg-black");
          document.getElementById("defaultModal").classList.add("bg-opacity-50");
          // document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')
        } else {
          document.getElementById("defaultModal").classList.add("hidden");
          // document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
        }
      };
    return (
        <>
        <div
                              id="defaultModal"
                              tabindex="-1"
                              aria-hidden="true"
                              class="absolute z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
                            >
                              <div class="relative w-full h-full max-w-2xl md:h-auto">
                                {/* <!-- Modal content --> */}
                                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                  {/* <!-- Modal header --> */}
                                  <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                      {videos.title}
                                    </h3>
                                    <button
                                      type="button"
                                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                      data-modal-hide="defaultModal"
                                      onClick={openVideo}
                                    >
                                      <svg
                                        aria-hidden="true"
                                        class="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                          clip-rule="evenodd"
                                        ></path>
                                      </svg>
                                      <span class="sr-only">Close modal</span>
                                    </button>
                                  </div>
                                  {/* <!-- Modal body --> */}
                                  <div class="p-6 space-y-6">
                                    <VideoPlayer links={videos.link} />
                                  </div>
                                </div>
                              </div>
                            </div>
        </>
    )
}
export default VideoModal ; 