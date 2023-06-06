import { FC } from 'react';
import Image from 'next/image';

interface TalkingHeadProps {
    videoURL: string | null;
    imageURL: string | null;
}

const TalkingHead: FC<TalkingHeadProps> = ({ videoURL, imageURL }) => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            {videoURL ? (
                <video src={videoURL} controls width={300}>
                    Your browser does not support the video tag.
                </video>
            ) : (
                imageURL ? (
                    <Image src={imageURL} alt="placeholder" width={645} height={405} />
                ) : (
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Image src={"https://assets.editorial.aetnd.com/uploads/2009/10/washington-gettyimages-640483581.jpg"} alt="placeholder" width={1920} height={1080} style={{objectFit: 'cover', width: '90%', height: '90%'}} />
                        {/* <Image src="/default_head.png" alt="placeholder" width={645} height={405} /> */}
                    </div>
                )
            )}
        </div>
    )
}

export default TalkingHead;
