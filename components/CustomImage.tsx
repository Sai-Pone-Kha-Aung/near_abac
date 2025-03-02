'use client'
import React from 'react'
import { IKImage } from 'imagekitio-next'

const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_URL_ENDPOINT;

interface ICustomImageProps {
    path: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
}
const CustomImage = ({ path, alt, width, height, className, priority }: ICustomImageProps) => {
    if (!urlEndpoint) {
        console.error("Missing urlEndpoint during initialization");
        return null;
    }

    return <IKImage
        urlEndpoint={urlEndpoint}
        path={path}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading='lazy'
        priority={priority}
    />
}

export default CustomImage