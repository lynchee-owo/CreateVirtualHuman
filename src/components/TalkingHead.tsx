// src/components/TalkingHead.tsx

// background: purple-ish

// top left: character name

// middle
    // at the beginning: jpeg
    // after user creates: video (mp4)

// right: description of the figure(?)
const TalkingHead = ( videoURL? ) => {
    return (
        {videoURL ? (
            <video src={videoURL} controls className="mt-8">
                Your browser does not support the video tag.
            </video>
        ) : (
            <Image src={imageURL} />
        )}
    )
}

export default TalkingHead;
