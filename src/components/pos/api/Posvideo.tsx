import React from 'react'

interface PosvideoProps {
  videoPath:string
}

const Posvideo:React.FC<PosvideoProps> = ({videoPath}) => {
  console.log(videoPath)

  return (
    <div>
      <video controls height={480} width={640} autoPlay >
        <source src={videoPath} type="video/mp4" />
      </video>
    </div>
  )
}

export default Posvideo