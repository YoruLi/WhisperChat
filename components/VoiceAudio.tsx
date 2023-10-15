import React, { useEffect, useRef, useState } from "react";
import SvgButton from "./SvgButton";
import svgs from "@/data/svgs";

import WaveSurfer from "wavesurfer.js";

import { Profile } from "@/types/schemas";
import ProfilePicture from "./profile-picture";

interface Props {
    messageAudio: string;
    profile: Profile | null;
}
export default function VoiceAudio({ messageAudio, profile }: Props) {
    const [isPlaying, updateIsPlaying] = useState(false);
    const [audioMessage, setAudioMessage] = useState<HTMLAudioElement | null>(null);
    const [currentPlayBackTime, updateCurrentPlayBackTimePlayBackTime] = useState(0);
    const [totalDuration, updatetotalDuration] = useState(0);
    const waveFormRef = useRef<HTMLDivElement | null>(null);
    const waveForm = useRef<WaveSurfer | null>(null);

    useEffect(() => {
        waveForm.current = WaveSurfer.create({
            container: waveFormRef.current as HTMLElement,
            waveColor: "rgb(203, 213, 225)",
            progressColor: "rgb(226, 232, 240)",
            cursorColor: "rgb(203, 213, 225)",
            barWidth: 3,
            height: 30,
            barHeight: 5,
            cursorWidth: 3,
        });

        waveForm.current.on("finish", () => {
            updateIsPlaying(false);
        });
        return () => {
            waveForm.current?.destroy();
        };
    }, []);

    useEffect(() => {
        if (audioMessage) {
            const updatePlayBackTime = () => {
                updateCurrentPlayBackTimePlayBackTime(audioMessage.currentTime);
            };
            audioMessage?.addEventListener("timeupdate", updatePlayBackTime);

            return () => {
                audioMessage?.removeEventListener("timeupdate", updatePlayBackTime);
            };
        }
    }, [messageAudio]);
    useEffect(() => {
        const audio = new Audio(messageAudio);
        setAudioMessage(audio);
        waveForm.current?.load(messageAudio);
    }, [messageAudio]);

    const formatTime = (time: number) => {
        if (isNaN(time)) {
            return `00:00`;
        }
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };
    const handlePlayRecording = () => {
        waveForm.current?.stop();
        waveForm.current?.play();
        audioMessage?.play();
        updateIsPlaying(true);
    };
    const handlePauseRecording = () => {
        waveForm.current?.stop();
        audioMessage?.pause();
        updateIsPlaying(false);
    };

    return (
        <div className="flex items-center w-full gap-3 px-3 py-1">
            <div>
                <ProfilePicture email={profile?.email} profile_picture={profile?.profile_picture} size="w-12 h-12" />
            </div>
            {messageAudio && (
                <>
                    {!isPlaying ? (
                        <SvgButton
                            path={svgs.playRecord.path}
                            viewBox={svgs.playRecord.viewBox}
                            type="button"
                            className="fill-slate-300"
                            size="w-8 h-8"
                            onClick={handlePlayRecording}
                        />
                    ) : (
                        <SvgButton
                            path={svgs.pauseRecord.path}
                            viewBox={svgs.pauseRecord.viewBox}
                            type="button"
                            className="fill-slate-300"
                            size="w-8 h-8"
                            onClick={handlePauseRecording}
                        />
                    )}
                </>
            )}

            <div className="w-60" ref={waveFormRef} />

            <div className="flex justify-between items-center">
                <span>{formatTime(isPlaying ? currentPlayBackTime : waveForm.current?.getDuration() ?? 0)}</span>
            </div>
        </div>
    );
}
