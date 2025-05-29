'use client'
import React from 'react'
import { IKImage } from 'imagekitio-next'

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_URL_ENDPOINT;

interface ICustomImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
    onLoad?: () => void;
}
const CustomImage = ({ src, alt, width, height, className, priority, onLoad }: ICustomImageProps) => {
    if (!urlEndpoint) {
        console.error("Missing urlEndpoint during initialization");
        return null;
    }

    return <IKImage
        urlEndpoint={urlEndpoint}
        path={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading='lazy'
        priority={priority}
        onLoad={onLoad}
    />
}

export default CustomImage