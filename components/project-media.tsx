"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type ProjectMediaProps = {
  image?: string
  alt?: string
  video?: string
  priority?: boolean
  className?: string
}

export function ProjectMedia({ image, alt, video, priority, className }: ProjectMediaProps) {
  const [videoFailed, setVideoFailed] = useState(false)
  const showVideo = Boolean(video) && !videoFailed

  return (
    <div className={cn("relative aspect-video overflow-hidden bg-muted", className)}>
      {image ? (
        <Image
          src={image}
          alt={alt ?? ""}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        // Stand-in until the project has its own picture.
        <div aria-hidden="true" className="media-placeholder absolute inset-0" />
      )}
      {showVideo && (
        <video
          src={video}
          poster={image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04] motion-reduce:hidden"
        />
      )}
    </div>
  )
}
