"use client";

import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

import BlurFadeText from "~/components/effects/blur-fade-text";
import BlurFade from "~/components/effects/blur-fade";
import { Button } from "~/components/button";
import { LuDownload } from "react-icons/lu";
import { cn } from "~/lib/utils";
import config from "~/config";

export default function Render() {
    const [image, setImage] = useState<string | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: useCallback((acceptedFiles: File[]) => {
            const file = acceptedFiles[0] as File;
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => event.target?.result && setImage(event.target.result.toString());
            reader.readAsDataURL(file);
        }, []),
        accept: { "image/*": [] }
    })

    return (
        <div className={"max-w-md min-h-[65dvh] mx-auto flex flex-col justify-between px-8 pt-8 mt-10 bg-background rounded-lg shadow-md items-center"}>
            <BlurFadeText
                className={"text-3xl font-bold my-4 mt-2.5 text-gray-900 dark:text-gray-100"}
                delay={config.initialAnimationDelay}
                yOffset={8}
                text={"Speechify Image"}
                animateByCharacter
            />
            <BlurFadeText
                className={"my-2.5 text-base font-normal text-black dark:text-white"}
                text={"Upload an image and add a Speech Bubble"}
                delay={config.initialAnimationDelay * 0.05}
            />
            <div className={"flex-1 h-full p-8"}>
                <BlurFade delay={config.initialAnimationDelay * 2}>
                    <div ref={resultRef} className={"w-fit h-full"}>
                        <div {...getRootProps()} className={"flex items-center justify-center w-full h-full relative"}>
                            <input {...getInputProps()} />
                            {image ? (<>
                                <img
                                    src={image}
                                    alt={"Image"}
                                    className={"max-w-full max-h-full"}
                                />
                                <img
                                    src={"/bubbles/tail_large_right.webp"}
                                    alt={"Speech Bubble"}
                                    className={"absolute w-full h-full top-0"}
                                />
                            </>) : (
                                <div className={"flex border-[3px] border-dashed border-gray-300 dark:border-slate-700 rounded-md p-8 bg-gray-600/10"}>
                                    <p className={"w-full text-black dark:text-white opacity-100"}>Drag and drop some files here, or click to select files</p>
                                </div>
                            )}
                        </div>
                    </div>
                </BlurFade>
                <div className={cn("flex w-full justify-end", image ? "block" : "hidden")}>
                    <Button
                        variant={"default"}
                        className={"mt-4 w-full inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md"}
                        onClick={() => {
                            if (resultRef.current) {
                                html2canvas(resultRef.current).then(canvas => {
                                    canvas.toBlob(blob => blob && saveAs(blob, "speechify_jakemc_dev_image.png"));
                                });
                            }
                        }}>
                        <LuDownload className={"w-6 h-6"} />
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};