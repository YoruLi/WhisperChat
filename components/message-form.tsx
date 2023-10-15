import React, { FormEvent, useRef, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import svgs from "@/data/svgs";
import SvgButton from "./SvgButton";
import AudioCapture from "./AudioCapture";
import useOptions from "@/hooks/useOptions";
import PreviewImage from "./messages/components/preview-image";
import useMessage from "@/hooks/useMessage";
import ChatActions from "./messages/components/chat-actions";
import { IChosenImages } from "./posts/utils/chooseImages";
import { ThreeDots } from "./ui/listengingLoader";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function MessageForm({ conversation, senderId, reiceverId }: { conversation: any; senderId: string; reiceverId: string }) {
    const [showPickerSelect, setShowPickerSelect] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [choosenImgs, setChoosenImgs] = useState<IChosenImages[]>([]);
    const { handleShowAttach, showOptions, optionsRef } = useOptions();
    const textCursor = useRef<HTMLInputElement>(null);

    const { text, setText, handleSubmitMessage, isSending } = useMessage({
        conversation: conversation,
        reiceverId: reiceverId,
        senderId: senderId,
        textCursor: textCursor,
        imageUrl: choosenImgs?.map(img => img.file),
    });

    const handleShowPickerEmoji = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        textCursor.current?.focus();
        setShowPickerSelect(!showPickerSelect);
    };

    const addSelectedEmoji = (event: any) => {
        const emojiToAdd = event.unified;
        let emoji = String.fromCodePoint(parseInt("0x" + emojiToAdd, 16));

        const startPos = textCursor.current?.selectionStart ?? 0;
        const endPos = textCursor.current?.selectionEnd ?? 0;

        const before = text.substring(0, startPos);
        const after = text.substring(startPos);
        setText(before + emoji + after);
        textCursor.current?.focus();
    };

    return (
        <>
            {showPickerSelect && (
                <div className="emoji-container absolute bottom-[67px] left-0 animate  w-full bg-[#1e1f27] ">
                    <Picker data={data} dynamicWidth={true} previewPosition={"none"} onEmojiSelect={addSelectedEmoji} />
                </div>
            )}
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleSubmitMessage();
                }}
                className=" relative mx-auto flex gap-3.5 min-h-[64px] p-3.5 items-center justify-center w-full lg:w-full dark:bg-black light:bg-white chill:bg-[#101218]  border chill:border-slate-700 dark:border-slate-700 light:border-slate-300 z-50"
            >
                {!isRecording && (
                    <>
                        <div className="relative flex gap-2">
                            <div>
                                {showPickerSelect ? (
                                    <SvgButton type={"button"} viewBox={svgs.x.viewBox} path={svgs.x.path} onClick={handleShowPickerEmoji} />
                                ) : (
                                    <SvgButton type={"button"} viewBox={svgs.EmojiIcon.viewBox} path={svgs.EmojiIcon.path} onClick={handleShowPickerEmoji} />
                                )}
                            </div>

                            <div>
                                <SvgButton
                                    type={"button"}
                                    viewBox={svgs.attach.viewBox}
                                    path={svgs.attach.path}
                                    onClick={() => handleShowAttach((prev: any) => !prev)}
                                    className=" focus:fill-current focus:stroke-current "
                                />
                            </div>
                            {showOptions && (
                                <ChatActions
                                    showOptions={showOptions}
                                    handleShowAttach={handleShowAttach}
                                    setChoosenImgs={setChoosenImgs}
                                    choosenImgs={choosenImgs}
                                    optionsRef={optionsRef}
                                />
                            )}
                        </div>

                        <input
                            type="text"
                            className={` ${
                                isSending
                                    ? "placeholder:text-whisper select-none border-transparent"
                                    : "placeholder:text-[#505050]  chill:border-slate-700 light:border-slate-400 dark:border-slate-700 "
                            } placeholder:capitalize w-full bg-transparent border px-3.5 py-2 rounded-xl outline-none caret-[#505050]  text-[#ededed] text-sm`}
                            placeholder={isSending ? "Enviando..." : "Enviar mensaje..."}
                            value={text}
                            ref={textCursor}
                            disabled={isSending}
                            onChange={e => {
                                setText(e.target.value);
                            }}
                            // onKeyDown={() => sendTypingEvent()}
                        />

                        {isSending ? (
                            <ThreeDots />
                        ) : text ? (
                            <SvgButton path={svgs.send.path} viewBox={svgs.send.viewBox} type="submit" disabled={isSending} />
                        ) : (
                            <SvgButton
                                path={svgs.microIcon.path}
                                viewBox={svgs.microIcon.viewBox}
                                type="button"
                                onClick={() => setIsRecording(!isRecording)}
                                disabled={isSending}
                                className=" focus:fill-current focus-visible:stroke-current"
                            />
                        )}
                    </>
                )}

                {/* {isRecording && <AudioCapture hide={setIsRecording} isRecording={isRecording} />} */}
            </form>

            {choosenImgs && (
                <PreviewImage choosenImgs={choosenImgs} setChosenImages={setChoosenImgs} text={text} setText={setText} handleSubmit={handleSubmitMessage} />
            )}
        </>
    );
}
