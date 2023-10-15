// import React, { Dispatch, LegacyRef, SetStateAction, useContext, useEffect, useRef, useState } from "react";
// import SvgButton from "./SvgButton";
// import svgs from "@/data/svgs";
// import WaveSurfer from "wavesurfer.js";
// import AppContext from "@/context/AppContext/AppContext";
// import useMessage from "@/hooks/useMessage";
// import SupabaseContext from "@/context/SupabaseContext/SupabaseContext";

// interface Props {
//     hide: Dispatch<SetStateAction<boolean>>;
//     isRecording: boolean;
// }
// export default function AudioCapture({ hide, isRecording }: Props) {
//     const { state } = useContext(AppContext);
//     const { sendAudioToChat, profile } = useContext(SupabaseContext);
//     const { sendMessageToChat, message, updateMessage } = useMessage({ chat: state.openedChat, imageUrl: undefined });
//     const [isRecordingAudio, setIsRecordingAudio] = useState(false);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const [renderedAudio, setRenderedAudio] = useState<File | null>(null);
//     const [audioRecorded, setAudioRecorded] = useState<HTMLAudioElement | null>(null);
//     const [recordedDuration, updateRecordedDuration] = useState(0);
//     const [totalDuration, updatetotalDuration] = useState(0);
//     const [currentPlayBackTime, updateCurrentPlayBackTimePlayBackTime] = useState(0);

//     const audioRef: LegacyRef<HTMLAudioElement> | undefined = useRef<HTMLAudioElement | null>(null);
//     const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//     const waveFormRef = useRef<HTMLDivElement | null>(null);
//     const waveForm = useRef<WaveSurfer | null>(null);
//     useEffect(() => {
//         waveForm.current = WaveSurfer.create({
//             container: waveFormRef.current as HTMLElement,
//             waveColor: "rgb(66,245,200)",
//             progressColor: "rgb(66,245,200)",
//             cursorColor: "rgb(66,245,200)",
//             barWidth: 2,
//             height: 20,
//             barHeight: 5,
//             cursorWidth: 3,
//         });

//         waveForm.current.on("finish", () => {
//             setIsPlaying(false);
//         });
//         return () => {
//             waveForm.current?.destroy();
//         };
//     }, []);

//     const formatTime = (time: number) => {
//         const minutes = Math.floor(time / 60);
//         const seconds = Math.floor(time % 60);
//         return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//     };

//     // useEffect(() => {
//     //     if (audioRecorded) {
//     //         const updatePlayBackTime = () => {
//     //             updateCurrentPlayBackTimePlayBackTime(audioRecorded.currentTime);
//     //         };
//     //         audioRecorded?.addEventListener("timeupdate", updatePlayBackTime);

//     //         return () => {
//     //             audioRecorded?.removeEventListener("timeupdate", updatePlayBackTime);
//     //         };
//     //     }
//     // }, [audioRecorded]);

//     const handleStopRecording = () => {
//         if (mediaRecorderRef.current && isRecordingAudio) {
//             mediaRecorderRef.current.pause();
//             setIsRecordingAudio(false);
//             waveForm.current?.pause();

//             const audioChunks: Blob[] = [];
//             mediaRecorderRef.current.addEventListener("dataavailable", e => {
//                 audioChunks.push(e.data);
//             });

//             mediaRecorderRef.current.addEventListener("pause", () => {
//                 const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
//                 const uuid = crypto.randomUUID();
//                 const audioFile = new File([audioBlob], `${uuid}.mp3`);
//                 updateMessage("https://ifweifsbugrkcnnwttqn.supabase.co/storage/v1/object/public/whisper-bucket/" + profile?.email + "/" + audioFile?.name);
//                 setRenderedAudio(audioFile);
//             });
//         }
//     };

//     const sendAudioRecording = async () => {
//         if (renderedAudio) {
//             sendAudioToChat(renderedAudio);
//             sendMessageToChat();
//         }
//     };
//     const handlePauseRecording = () => {
//         waveForm.current?.stop();
//         audioRecorded?.pause();
//         setIsPlaying(false);
//     };

//     useEffect(() => {
//         if (!isRecordingAudio) return;

//         let interval: string | number | NodeJS.Timer | undefined;
//         interval = setInterval(() => {
//             updateRecordedDuration(prevState => {
//                 return prevState + 1;
//             });
//         }, 1000);

//         return () => {
//             clearInterval(interval);
//         };
//     }, [isRecordingAudio]);

//     useEffect(() => {
//         if (waveForm) {
//             handleStartRecording();
//         }
//     }, [waveForm]);
//     const handlePlayRecording = () => {
//         waveForm.current?.stop();
//         waveForm.current?.play();
//         audioRecorded?.play();
//         setIsPlaying(true);
//     };

//     const handleResumeRecording = () => {
//         setIsRecordingAudio(true);
//         waveForm.current?.stop();
//         waveForm.current?.play();
//         mediaRecorderRef.current?.resume();
//     };
//     const handleStartRecording = () => {
//         if (!isRecording) {
//             return;
//         }

//         if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
//             throw new Error("mediaDevices API or getUserMedia method is not supported in this browser.");
//         } else {
//             setIsRecordingAudio(true);
//             navigator.mediaDevices
//                 .getUserMedia({ audio: true })
//                 .then(stream => {
//                     const mediaRecorder = new MediaRecorder(stream);
//                     mediaRecorderRef.current = mediaRecorder;
//                     audioRef.current!.srcObject = stream;
//                     const chunks: Blob[] = [];
//                     mediaRecorder.ondataavailable = e => chunks?.push(e.data);
//                     mediaRecorder.onpause = () => {
//                         const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//                         const audioUrl = window.URL.createObjectURL(blob);
//                         const audio = new Audio(audioUrl);
//                         setAudioRecorded(audio);

//                         waveForm.current?.load(audioUrl);
//                     };

//                     mediaRecorder.start();
//                 })

//                 .catch(error => {
//                     console.error(error);
//                 });
//         }
//     };

//     return (
//         <div className="flex w-full h-full justify-end items-center ">
//             <div className="flex w-full max-w-[300px] items-center gap-3 ">
//                 <SvgButton path={svgs.deleteIcon.path} viewBox={svgs.deleteIcon.viewBox} type="button" onClick={() => hide(false)} />
//                 {isRecordingAudio ? (
//                     <div className="text-emerald-400 text-center w-full">
//                         <span className="capitalize">recording... </span>
//                         <span>{formatTime(recordedDuration)}</span>
//                     </div>
//                 ) : (
//                     <div>
//                         {audioRecorded && (
//                             <>
//                                 {!isPlaying ? (
//                                     <SvgButton path={svgs.playRecord.path} viewBox={svgs.playRecord.viewBox} type="button" onClick={handlePlayRecording} />
//                                 ) : (
//                                     <SvgButton path={svgs.pauseRecord.path} viewBox={svgs.pauseRecord.viewBox} type="button" onClick={handlePauseRecording} />
//                                 )}
//                             </>
//                         )}
//                     </div>
//                 )}
//                 <div className="w-60" ref={waveFormRef} hidden={isRecordingAudio} />
//                 <div className="flex justify-between items-center">
//                     {!isRecordingAudio && <span>{formatTime(isPlaying ? currentPlayBackTime : recordedDuration)}</span>}
//                 </div>
//                 <audio ref={audioRef} hidden />

//                 <div>
//                     {!isRecordingAudio ? (
//                         <SvgButton path={svgs.microIcon.path} viewBox={svgs.microIcon.viewBox} type="button" onClick={handleResumeRecording} />
//                     ) : (
//                         <SvgButton path={svgs.pauseRecord.path} viewBox={svgs.pauseRecord.viewBox} onClick={handleStopRecording} type="button" />
//                     )}
//                 </div>

//                 <SvgButton path={svgs.send.path} viewBox={svgs.send.viewBox} type="button" onClick={sendAudioRecording} />
//             </div>
//         </div>
//     );
// }

import React from "react";

export default function AudioCapture() {
    return null;
}
