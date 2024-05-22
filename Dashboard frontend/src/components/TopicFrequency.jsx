/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { MyContext } from "./Context";

const TopicFrequency = () => {
  const { filterContextData } = useContext(MyContext);
  const [topic, setTopic] = useState([]);
  useEffect(() => {
    const countTopics = {};
    filterContextData.forEach((item) => {
      const topic = item.topic;
      if (countTopics[topic]) {
        countTopics[topic]++;
      } else {
        countTopics[topic] = 1;
      }
    });

    const topicArray = Object.keys(countTopics).map((topic) => {
      return { topicname: topic, numberofoccurrences: countTopics[topic] };
    });
    const sortedTopic = topicArray
      .sort((a, b) => b.numberofoccurrences - a.numberofoccurrences)
      .slice(0, 3);
    setTopic(sortedTopic);
  }, [filterContextData]);

  return (
    <div className=" w-1/2 h-full flex flex-col pl-2 ">
      <p className="text-white text-xl font-bold mb-2">
        Hot topics with their Frequency
      </p>

      <div className="flex gap-2 ">
        {topic.map((topic) => (
          <>
            <div className="border-2 border-white w-1/3 h-full rounded-md p-2  ">
              <h1 className="text-3xl font-bold text-[#fca311]">
                {topic.topicname || "Other"}
              </h1>
              <h1 className=" text-6xl font-bold text-[#ff0054]">
                {topic.numberofoccurrences}
              </h1>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default TopicFrequency;
